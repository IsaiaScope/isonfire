#!/usr/bin/env node
import { Command as p } from "commander";
import r from "node:fs";
import { Octokit as l } from "@octokit/rest";
const w = {
  OWNER: "IsaiaScope",
  REPO: "isonfireCLI",
  REPO_FOLDER_DATA: "data",
  FOLDER: "types",
  DESTINATION_FOLDER: "copy-folder"
}, a = new l({
  auth: "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"
});
async function y({
  owner: o,
  repo: t,
  directory: n
}) {
  const { data: d } = await a.repos.getContent({
    owner: o,
    repo: t,
    path: n
  });
  for (const m of d) {
    const { type: c, path: e } = m;
    if (c === "dir")
      r.mkdirSync(e, { recursive: !0 }), await y({ owner: o, repo: t, directory: e });
    else if (c === "file") {
      const { data: s } = await a.repos.getContent({
        owner: o,
        repo: t,
        path: e
      }), u = Buffer.from(s.content, "base64").toString("utf-8");
      if (!r.existsSync(e)) {
        const R = e.split("/").slice(0, -1).join("/");
        r.mkdirSync(R, { recursive: !0 });
      }
      r.writeFileSync(s.path, u);
    }
  }
}
const { OWNER: O, REPO: D, REPO_FOLDER_DATA: E } = w, f = new p("copy");
f.name("copy").description("Copy from GitHub repository").argument("[directory]", "Directory to copy").argument("[owner]", "Repository owner").argument("[repo]", "Repository name").option("-d, --directory <directory>", "Folder to copy", E).option("-o, --owner <owner>", "Repository owner").option("-r, --repo <repo>", "Repository name").action(async (o, t = O, n = D) => {
  await y({ owner: t, repo: n, directory: o }).catch(console.error);
});
const i = new p();
i.version("1.0.10", "-v, --version", "check CLI version").name("isonfirecli").description("isonfireCLI to copy from GitHub repository");
i.addCommand(f);
i.parse(process.argv);
export {
  i as program
};
