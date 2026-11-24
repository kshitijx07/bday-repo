# Birthday Storybook

An interactive love-storybook website: cinematic opening, a 3D book that opens, five story pages, photo memories with a fullscreen viewer, a letter that writes itself, and a quiet birthday finale.
Stack: React 18 · Vite · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide. No backend, no secrets.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then outputs to dist/
npm run preview  # serve the production build locally
```

## Make it yours
- **All words** live in `src/data/storyContent.ts`: her name, date, headlines, captions, the letter, the final message. Anything in `[square brackets]` is a placeholder.
- **Photos** live in `public/images/`. Replace a file with the same name, or change the path and `ratio` (`width / height`) in `storyContent.ts`. Keep photos around 1500px on the long side (about 200–300 KB each).
- **Palette**: charcoal `#2A2A2A`, silver `#C0C0C0`, signal red `#E10600` (see `tailwind.config.js`).
- Controls: arrows / swipe / on-screen buttons to turn pages, `Esc` to close the book or photo viewer. Reduced-motion settings are respected.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project** and import the repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

Fonts load from Google Fonts, so the first visit needs an internet connection.
