# The Diwali Showdown

A host-controlled quiz for two teams. Five categories, six prizes per category, 30 questions. Built with plain HTML, CSS, and JavaScript; no installation or build step.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

Open http://127.0.0.1:4173. You can also open `dist/index.html` directly; use the local server for consistent browser storage behavior.

## Host the game

- Open settings to rename both teams and choose the next team.
- Teams choose any available category and prize. Higher prizes are harder.
- Open a tile, have the team answer aloud, then reveal the answer.
- Mark Correct to add the prize, or Wrong for zero points. No answer input and no negative scoring.
- The turn alternates after either verdict. Played tiles are disabled and marked.
- The timer is optional and never auto-submits a verdict. Closing an unrevealed question returns it to the board; once revealed, mark a verdict to finish it.
- Undo restores the last question, score, and previous turn. New game clears the game after confirmation and preserves team names. It reuses the same questions.
- The game saves in this browser on this device. It is intended for a shared screen; it does not sync across separate devices. Other tabs on the same origin sync through browser storage.
- A results dialog appears after all 30 questions, including a tie result when appropriate.

## Customize questions

Edit `dist/questions.js`. Every category has questions ordered by the prize values ₹100, ₹250, ₹500, ₹1,000, ₹2,000, ₹2,500. The bank is hidden in the game interface until a tile is opened. As with any static quiz site, technically inclined players can read the bank in browser source; use a host-controlled shared screen.

Question-specific verification links are kept alongside applicable questions in the source, outside the game interface. They include NASA, World Athletics, ICC, tourism authorities, and the Indian Heritage Centre. No question spoilers are printed in this README.

## Design

Warm ivory, terracotta, sage, a custom vector diya, Playfair Display headings, and DM Sans interface text. System font fallbacks work offline. Motion respects `prefers-reduced-motion`. The game board retains all five categories on small screens.
