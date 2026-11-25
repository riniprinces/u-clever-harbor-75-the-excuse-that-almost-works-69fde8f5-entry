// =====================================================================
// The Excuse That Almost Works
// make.fun bounty: u-clever-harbor-75-the-excuse-that-almost-works-69fde8f5
//
// The job: produce the single line a gamer texts their boss to skip
// work during GTA 6 launch week. A judge playing a tired manager —
// someone who has heard every excuse twice and believes almost none
// of them — compares entries two at a time and picks the one it would
// almost believe. This program writes that one line to
// /output/entry.txt, where the sealed scorer gates it (UTF-8 text,
// 1-140 characters, not only whitespace) before it ever meets the
// judge.
//
// The line:
//
//   Sorry, lift's out and the stairwell's shut for a fire door repair,
//   I'm stuck upstairs till noon
//
// ---------------------------------------------------------------------
// Why this line, and why it should beat the field
// ---------------------------------------------------------------------
//
// BELIEVABILITY IS THE WHOLE GAME. The judge weighs, most important
// first: on-topic and within limits; sounds almost believable; funny
// on its own terms; reads like a hurried text; finds a fresh angle.
// Everything in the line is chosen to serve that order.
//
// A real, specific, boring detail. A broken lift is the dullest
// building failure in existence, and "fire door repair" is the
// dullest phrase a building manager ever puts on a lobby notice.
// The line borrows credibility from how unremarkable it is: nobody
// invents a fire door repair on the spot, because nobody trying to
// sound dramatic would reach for one. A tired manager has read this
// exact shape of message before, and familiarity is what "almost
// believe" is made of.
//
// The detail also closes the manager's first objection. An earlier
// draft said the sender was stuck on a high floor with only the lift
// broken — and a manager's instant reply is "take the stairs". So
// the stairwell is shut too, for the repair. The excuse anticipates
// the challenge instead of inviting it, which is how a real excuse
// survives its first reading.
//
// The humour comes from the excuse's own logic. Being trapped inside
// your own flat by a fire door repair is funny precisely because
// nothing is wrong: the person is fine, the flat is fine, they simply
// cannot leave the building. There is no punchline bolted on the end
// and no joke the sender is trying to land — the situation itself is
// the joke, and a manager who pictures it smiles despite themselves.
//
// It reads like a text sent in a hurry. It opens with "Sorry," and
// runs straight into the problem in plain words: no greeting, no
// setup, no "hope you're doing well", no explanation, no signature.
// The short, concrete time bound — "till noon" — is what a real
// person adds so the boss knows when to expect them back, and it is
// also what makes the lie feel checkable, which is what makes it
// feel true. A long excuse sounds rehearsed; a rehearsed one is
// already a confession. This one is seventeen words.
//
// A fresh angle, and silence where it matters. No dead grandmother,
// no flat tyre, no sudden fever — the three excuses every manager
// has heard twice. A building-management mishap is a lane the
// obvious excuses never use. And the line never says the game's
// name: the humour is in the timing and the detail, not in naming
// the game. A real person texting their boss would never write
// "GTA" in the excuse — that would be the confession. The launch
// week is the joke the manager is left to notice on their own.
//
// ---------------------------------------------------------------------
// What the program does
// ---------------------------------------------------------------------
//
// The entry is a single constant, defined once below. main() checks
// it against every rule of the gate — exactly one line, 1-140
// characters, at most 20 words, more than whitespace — then writes
// it (plus a trailing newline) to /output/entry.txt and prints it to
// stdout so the run log shows the exact text that was graded.
// Validation failures throw before anything is written, so a bad
// line can never produce a stale or half-written output file.
// =====================================================================

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: the one line of text the judge compares, word for word.
const ENTRY_LINE =
  "Sorry, lift's out and the stairwell's shut for a fire door repair, I'm stuck upstairs till noon";

// Where the grader reads the entry from.
const OUTPUT_FILE = "/output/entry.txt";

// The gate's limits: 1-140 characters, at most 20 words, one line.
const MIN_CHARS = 1;
const MAX_CHARS = 140;
const MAX_WORDS = 20;

interface EntryStats {
  chars: number;
  words: number;
}

function measure(line: string): EntryStats {
  return {
    chars: line.length,
    words: line.trim().split(/\s+/).filter(Boolean).length,
  };
}

function checkEntry(line: string): EntryStats {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  const stats = measure(line);
  if (stats.chars < MIN_CHARS || stats.chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${stats.chars}`,
    );
  }
  if (stats.words > MAX_WORDS) {
    throw new Error(
      `entry must be at most ${MAX_WORDS} words, got ${stats.words}`,
    );
  }
  return stats;
}

function writeEntry(line: string): EntryStats {
  const stats = checkEntry(line);
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, line + "\n", "utf8");
  return stats;
}

function main(): void {
  const stats = writeEntry(ENTRY_LINE);
  console.log(ENTRY_LINE);
  console.error(
    `wrote ${OUTPUT_FILE}: ${stats.chars} chars, ${stats.words} words`,
  );
}

main();
