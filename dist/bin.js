#!/usr/bin/env node
import n from "node:fs";
import { Octokit as l } from "@octokit/rest";
import { Command as m } from "commander";
console.log("Hello, world!");
console.log("🧊 ~ PKG_VERSION: ", "1.0.10");
const a = new m();
a.version("1.0.10");
const r = new l(), d = "IsaiaScope", g = "isonfireCLI", w = "data";
async function c(t, e, i) {
  const { data: s } = await r.repos.getContent({ owner: t, repo: e, path: i });
  for (const o of s)
    if (console.log("🧊 ~ item: ", o), o.type === "dir")
      n.mkdirSync(o.path, { recursive: !0 }), await c(t, e, o.path);
    else if (o.type === "file") {
      const { data: p } = await r.repos.getContent({ owner: t, repo: e, path: o.path }), f = Buffer.from(p.content, "base64").toString("utf-8");
      n.writeFileSync(o.path, f);
    }
}
c(d, g, w).catch(console.error);
a.parse(process.argv);
