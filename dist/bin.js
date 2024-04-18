#!/usr/bin/env node
import r from "node:fs";
import { Octokit as l } from "@octokit/rest";
console.log("Hello, world!");
console.log("🧊 ~ process: ", process.env.USERNAME);
const t = new l(), s = "IsaiaScope", n = "isonfireCLI", i = "src/types";
async function a() {
  try {
    const { data: e } = await t.repos.getContent({
      owner: s,
      repo: n,
      path: i
    });
    for (const o of e) {
      console.log("🧊 ~ file2: ", o.path);
      const { data: c } = await t.repos.getContent({
        owner: s,
        repo: n,
        path: o.path
      });
      r.writeFileSync(o.name, Buffer.from(c.content, "base64")), console.log(`File "${o.name}" copied successfully.`);
    }
    console.log("All files copied successfully.");
  } catch (e) {
    console.error("Error fetching or copying files:", e.message);
  }
}
a();
