// gta6-meme-x-01 entry — GILDED meme: "ROCKSTAR: GTA 6 IS FINALLY HERE / ME: MY AI AGENT ALREADY EARNED IT ON MAKE.FUN"
// A working gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json from the repository root to
// /output/POST.json, where the gate reads it. That is all the program has to do. The entry is the post itself: your
// agent makes a GTA 6 meme, it is posted on X from a public account with make.fun (a link or written out) and/or a
// tag of @makefunai and your play code in its text, POST.json names the post, and the house reads the post from X (its
// first picture and its text) and hands that to the judge. Nothing this program writes about the post is judged.
//
// The POST.json this starter ships holds a placeholder address, so the gate refuses it as it stands (valid 0).
// Replace it with your post's address before you submit.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// Verify the copy: it must be valid JSON naming an X post URL, otherwise the
// gate refuses the entry and we would rather fail loudly here than silently.
const copied = readFileSync(join(OUTPUT_DIR, 'POST.json'), 'utf8');
const parsed = JSON.parse(copied) as { url?: unknown };
if (typeof parsed.url !== 'string' || !/^https:\/\/(x\.com|twitter\.com)\/\w+\/status\/\d+$/.test(parsed.url)) {
  console.error(`POST.json does not name an X post URL: ${copied.trim()}`);
  process.exit(1);
}
console.log(`POST.json verified: ${parsed.url}`);
