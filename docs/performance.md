# Frontend Performance Baseline

## Scope

This comparison measures the homepage from a clean local production build with Lighthouse 13.4.0 using Chrome on the same Windows machine. Scores vary between runs, so use the directional changes and transfer size together rather than treating a single score as a release gate.

Run the current check with:

```powershell
npm run perf:lighthouse
```

The JSON artifact is written to `output/lighthouse-performance.json`, which is intentionally ignored by Git.

## Results

| Metric | Before | After |
| --- | ---: | ---: |
| Performance score | 57 | 77 |
| First Contentful Paint | 8.3 s | 4.0 s |
| Largest Contentful Paint | 9.6 s | 4.1 s |
| Total Blocking Time | 0 ms | 20 ms |
| Cumulative Layout Shift | 0 | 0 |
| Transferred bytes | 1,498 KiB | 662 KiB |

## What Changed

- The compiled stylesheet is discovered in the document head and preloaded as critical CSS.
- Inter and Space Grotesk are preloaded, while `font-display=swap` keeps text visible if the webfont is slow.
- Material Symbols is requested at the static 400 weight and limited to the icon names used by the site. This removes the full variable icon font from the critical path.
- The initial `#app` content is a small visual loading shell instead of the crawler fallback, preventing a content flash before the interactive application replaces it. The non-JavaScript fallback remains available in `noscript`.
- Google Analytics waits for idle time, then records the current page view after it loads.
- The approved corpus, retrieval engine, and synthesis client are loaded through dynamic imports after the first render rather than bundled into the initial entry chunk.

## Rendering Notes

This is a vanilla JavaScript application, so it does not hydrate server-rendered React/Vue markup. The relevant startup risks are instead a flash from the previous static fallback, font delay, and eager client work. The browser smoke check verifies that the interactive home page renders without page errors after these changes.
