# Tan-Diwali-Party

The Diwali Showdown is a host-controlled quiz for two teams. Five categories, six prizes per category, 30 questions with difficulty increasing by prize value. Built with plain HTML, CSS, and JavaScript; no installation, account, or build step. It runs locally or on a static host such as GitHub Pages.

The current mix includes Manchester United, Formula 1, Bollywood and longer dialogue excerpts, with approachable high-value Diwali questions. The Jain and Wimbledon questions are retained.

## Run locally

From this directory:

```sh
python3 -m http.server 4173 --directory dist --bind 127.0.0.1
```

Open http://127.0.0.1:4173. You can also open `dist/index.html` directly; use the local server for consistent browser storage behavior.

On macOS you can double-click `start.command` instead, then open the address above. Keep its terminal window open while playing. Press Control-C in that terminal to stop it.

## Deploy on GitHub Pages

In this repository, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/(root)**, then save. The root `index.html` opens the quiz in `dist/`; `.nojekyll` allows the static files to be served directly. No build command, dependencies, environment variables, or backend are needed.

See the [GitHub Pages publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for details. On another static host, select `dist` as the publish directory.

## Host the game

- Open settings to rename both teams and choose the next team.
- Use the sun/moon button in the header to switch between dark and light mode. Your choice is saved on this device; a new browser starts in dark mode.
- Teams choose any available category and prize. Difficulty progresses from easy at ₹100, easy-plus at ₹250, and medium at ₹500 to increasingly challenging questions at ₹1,000–₹2,500. All levels use familiar subjects. Higher prizes test more specific recall or several answer parts, without relying on specialist knowledge.
- Open a tile, have the team answer aloud, then reveal the answer.
- Mark Correct to add the prize, or Wrong for zero points. No answer input and no negative scoring.
- The turn alternates after either verdict. Played tiles are disabled and marked.
- The timer is optional and never auto-submits a verdict. Closing an unrevealed question returns it to the board; once revealed, mark a verdict to finish it.
- Undo restores the last question, score, and previous turn. New game clears the game after confirmation and preserves team names. It reuses the same questions.
- The game saves in this browser on this device. It is intended for a shared screen; it does not sync across separate devices. Other tabs on the same origin sync through browser storage.
- A results dialog appears after all 30 questions, including a tie result when appropriate.
- The rebalanced question set starts a fresh board and retains any saved team names from the previous set. It keeps its own saved game so previous completions do not hide the new questions.

## Customize questions

Edit `dist/questions.js`. Every category has questions ordered by the prize values ₹100, ₹250, ₹500, ₹1,000, ₹2,000, ₹2,500. The bank is hidden in the game interface until a tile is opened. As with any static quiz site, technically inclined players can read the bank in browser source; use a host-controlled shared screen.

Question-specific verification links are kept alongside applicable questions in the source, outside the game interface. Prompts omit first-place names, show/event hints for quotes, and explanatory context that belongs in the answer notes. No question spoilers are printed in this README.

## Design

Warm ivory or deep charcoal, terracotta, sage, a custom vector diya, Playfair Display headings, and DM Sans interface text. Fonts and their open-source licenses are bundled under `dist/fonts/`; all runtime assets are local and the app makes no external requests. Motion respects `prefers-reduced-motion`. The game board retains all five categories on small screens.
