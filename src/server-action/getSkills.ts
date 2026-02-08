"use server";

import fs from "fs/promises";
import path from "path";

export async function getSkills(): Promise<string> {
  const filePath = path.join(process.cwd(), "src/tech-list/techList.json");
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}
