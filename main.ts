// The Painfully Honest Out-of-Office — u-po-pu-the-painfully-honest-out-of-office-63e7ca0b
//
// Writes one brutally honest but still polite out-of-office auto-reply
// (a single sentence, at most 200 characters) to /output/entry.txt.
//
// The line admits the private truth every employee knows but never
// types — that the sender is deliberately ignoring a pile of unread
// mail — while staying warm enough that a manager reading it would
// let it stand. The joke is the word "heroically": pretending the
// inbox does not exist is framed as a brave act, which is exactly
// how it feels on a Monday morning.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I'm away until Monday, heroically pretending my 412 unread emails don't exist \u2014 thank you for your patience.";

if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars; must be 1-200`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read it back: a silent write of the wrong bytes would be a wasted entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt round-trip mismatch");
}
