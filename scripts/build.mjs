import { cp, mkdir, rm } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);
const files = ["index.html", "styles.css", "script.js", "favicon.svg", "CNAME"];

await rm(output, { force: true, recursive: true });
await mkdir(output, { recursive: true });

await Promise.all(
  files.map((file) => cp(new URL(file, root), new URL(file, output))),
);
await cp(new URL("assets/", root), new URL("assets/", output), { recursive: true });

console.log("Built static site in dist/");
