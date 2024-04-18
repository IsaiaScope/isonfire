#!/usr/bin/env node
import { Command as d } from "commander";
import c from "node:fs";
import { Octokit as R } from "@octokit/rest";
const y = {
  OWNER: "IsaiaScope",
  REPO: "isonfireCLI",
  REPO_FOLDER_DATA: "data-on-fire"
}, f = new R({
  // auth: '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',
});
async function m({ owner: t, repo: r, path: s }) {
  const { data: n } = await f.repos.getContent({
    owner: t,
    repo: r,
    path: s
  });
  if (Array.isArray(n))
    for (const i of n) {
      const { type: a, path: o } = i;
      if (a === "dir")
        c.mkdirSync(o, { recursive: !0 }), await m({ owner: t, repo: r, path: o });
      else if (a === "file") {
        const { data: e } = await f.repos.getContent({
          owner: t,
          repo: r,
          path: o
        });
        if (!("content" in e))
          return;
        const p = Buffer.from(e.content, "base64").toString("utf-8");
        if (!c.existsSync(o)) {
          const E = o.split("/").slice(0, -1).join("/");
          c.mkdirSync(E, { recursive: !0 });
        }
        c.writeFileSync(e.path, p);
      }
    }
}
async function u({ owner: t, repo: r, path: s }, n = 1) {
  const { data: i } = await f.repos.getContent({
    owner: t,
    repo: r,
    path: s
  });
  if (Array.isArray(i))
    for (const a of i) {
      const { type: o, path: e } = a;
      if (o === "dir") {
        const p = e.split("/").pop();
        console.log(
          `${"  ".repeat(n)} ${p} -> npx isonfirecli copy ${e}`
        ), await u({ owner: t, repo: r, path: e }, n + 1);
      }
    }
}
const { OWNER: A, REPO: w, REPO_FOLDER_DATA: C } = y, h = new d("copy");
h.name("copy").description("Copy from GitHub repo, default is data-on-fire folder").argument("[path]", "Directory path to copy").option("-p, --path <path>", "Folder path to copy").action(async (t = C) => {
  await m({ owner: A, repo: w, path: t }).catch(console.error);
});
const { OWNER: D, REPO: g, REPO_FOLDER_DATA: F } = y, O = new d("see");
O.name("see").description("See all paths from GitHub repository").action(async () => {
  await u({ owner: D, repo: g, path: F }).catch(
    console.error
  );
});
const l = new d();
l.version("1.0.10", "-v, --version", "check CLI version").name("isonfirecli").description("Copy from GitHub repository https://github.com/IsaiaScope/isonfireCLI");
l.addCommand(h).addCommand(O);
l.parse(process.argv);
export {
  l as program
};
