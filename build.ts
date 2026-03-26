import { Glob } from "bun";
import pkg from "./package.json" with { type: "json" };

const tags = {
  "@author": pkg.author ?? "you",
  "@connect": pkg.config?.connect ?? [],
  "@description": pkg.description,
  "@downloadURL": pkg.config?.downloadURL,
  "@exclude": pkg.config?.exclude ?? [],
  "@grant": [],
  "@homepage": pkg.homepage,
  "@icon": pkg.config?.icon,
  "@include": pkg.config?.include ?? [],
  "@match": pkg.config?.match ?? [],
  "@name": pkg.name,
  "@namespace": pkg.config.namespace ?? "http://tampermonkey.net/",
  "@noframes": pkg.config?.noframes,
  "@require": pkg.config?.require ?? [],
  "@resource": pkg.config?.resource ?? [],
  "@run-at": pkg.config?.["run-at"],
  "@run-in": pkg.config?.["run-in"],
  "@sandbox": pkg.config?.sandbox,
  "@supportURL":
    pkg.config?.supportURL ?? pkg.repository?.url ?? pkg.repository,
  "@tag": pkg.keywords ?? [],
  "@updateURL": pkg.config?.updateURL,
  "@version": pkg.version,
};

const apis = new Set<string>();
const pattern =
  /\b(GM[._][^()},;\n]+|unsafeWindow|window\.(?:close|focus|onurlchange))[.,()};]/g;

for (const file of await Array.fromAsync(
  new Glob("**/*.ts").scan({ absolute: true, cwd: "./src" }),
)) {
  let match;
  while ((match = pattern.exec(await Bun.file(file).text())) !== null) {
    apis.add(match[1]);
  }
}

for (const api of apis) {
  (tags["@grant"] as string[]).push(api);
}

const maxLabelLen = Math.max(...Object.keys(tags).map((k) => k.length));

const headerLines = Object.entries(tags).flatMap(([label, value]) => {
  if (!value) {
    return [];
  }
  const padding = " ".repeat(maxLabelLen - label.length);
  if (Array.isArray(value)) {
    return value.map((v) => `// ${label}${padding} ${v}`);
  }
  return [`// ${label}${padding} ${value}`];
});

const banner = [
  "// ==UserScript==",
  ...headerLines,
  "// ==/UserScript==",
  "(function(){",
  '"use strict";',
].join("\n");

const footer = "})();";

await Bun.build({
  banner,
  entrypoints: ["./src/index.ts"],
  env: "inline",
  footer,
  minify: true,
  outdir: "./dist",
});
