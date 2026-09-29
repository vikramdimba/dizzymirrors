import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);
const files = ["styles.css", "script.js", "favicon.svg"];
const archiveUrl = "https://dizzymirrors.substack.com/api/v1/archive?sort=new&offset=0&limit=3";

// Substack rejects requests without a browser-like user agent.
async function fetchLatestPosts() {
  try {
    const response = await fetch(archiveUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (dizzymirrors.com build)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const archive = await response.json();
    return archive.slice(0, 3).map((post) => ({
      title: post.title,
      subtitle: post.subtitle ?? "",
      date: post.post_date,
      url: post.canonical_url,
      image: post.cover_image,
    }));
  } catch (error) {
    console.warn(`Using saved newsletter posts (${error.message})`);
    return JSON.parse(await readFile(new URL("data/posts.json", root), "utf8"));
  }
}

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

// Substack's image proxy crops the cover and converts formats like .tif that browsers can't show.
const coverUrl = (image) =>
  `https://substackcdn.com/image/fetch/w_640,h_420,c_fill,f_auto,q_auto:good/${encodeURIComponent(image)}`;

function renderPost(post) {
  const date = new Date(post.date);
  const label = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const image = post.image
    ? `<img src="${coverUrl(post.image)}" width="640" height="420" loading="lazy" alt="" />`
    : "";
  return `<a class="post" href="${escapeHtml(post.url)}">
            ${image}
            <time datetime="${date.toISOString().slice(0, 10)}">${label}</time>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.subtitle)}</p>
          </a>`;
}

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });

const posts = await fetchLatestPosts();
const html = (await readFile(new URL("index.html", root), "utf8")).replace(
  /<!-- posts:start -->[\s\S]*<!-- posts:end -->/,
  `<!-- posts:start -->\n          ${posts.map(renderPost).join("\n          ")}\n          <!-- posts:end -->`,
);
await writeFile(new URL("index.html", output), html);

await Promise.all(
  files.map((file) => cp(new URL(file, root), new URL(file, output))),
);
await cp(new URL("assets/", root), new URL("assets/", output), { recursive: true });

console.log(`Built static site in dist/ with ${posts.length} newsletter posts`);
