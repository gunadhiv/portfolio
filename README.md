# Vivienne Gunadhi — Analytics Portfolio

A responsive single-page portfolio built with React, Vite, Tailwind CSS, Lucide React, and Framer Motion.

## Run locally

1. Install Node.js 20 or newer.
2. In this folder, run `npm install`.
3. Start the development server with `npm run dev`.
4. Open the local URL shown by Vite.

Create a production build with `npm run build`. Preview it with `npm run preview`.

## Update the content

All portfolio copy, metrics, links, skills, and projects live in `src/data/portfolioData.js`.

Before publishing, replace the placeholder email, GitHub URL, and LinkedIn URL in `portfolio.profile`. To add a project, duplicate one object in the exported `projects` array, give it a unique `id`, and add a 16:9 JPG or WebP image to `public/projects/`.

Each project supports:

- `category`: use `Data Analytics`, `Case Competitions`, or `Vibe Coding`
- `featured`: controls emphasis on the first card
- `status`: a short award or project-state label
- `impact`: two or three evidence-based metrics
- `problem`, `methodology`, and `findings`: shown in the detail drawer
- `links`: optional GitHub, live demo, or deck links

## Deploy free on Vercel (recommended)

1. Create a new GitHub repository and push this folder to it.
2. Sign in to Vercel and select **Add New → Project**.
3. Import the repository. Vercel detects Vite automatically.
4. Confirm build command `npm run build` and output directory `dist`.
5. Click **Deploy**.

Vercel is the simplest option here because it provides free preview deployments for every branch and requires no base-path configuration. GitHub Pages also works, but requires a deployment workflow and a Vite `base` setting when hosted below a repository path.

## Optional GitHub Pages deployment

Install `gh-pages` with `npm install --save-dev gh-pages`, add `"deploy": "npm run build && gh-pages -d dist"` to `scripts`, and set `base: '/REPOSITORY-NAME/'` in a new `vite.config.js`. Then run `npm run deploy` and enable Pages from the `gh-pages` branch.

## Visual directions

The Style control in the navigation switches among Editorial, Midnight, and Signal. The choice is stored in the browser. CSS variables for each direction live at the top of `src/index.css`, so colors and corner styles can be changed without touching components.
