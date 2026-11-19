# File Inventory

## Electron wrapper

- `package.json` — Electron and electron-builder configuration.
- `main.js` — local launcher window and Appetize session window.
- `preload.js` — secure IPC bridge.
- `index.html`, `renderer.js`, `styles.css` — desktop launcher UI and animated background.
- `assets/app-icon.svg` — Electron launcher icon artwork.
- `README.md` — combined setup and deployment instructions.
- `docs/` — chat details, free limits, and own-clone research.

## Static site for GitHub Pages / Cloudflare Pages

- `site/index.html` — promotional landing page.
- `site/support.html` — divided support hub with age-gated payment lanes.
- `site/subscribe.html` — newsletter plus age-gated PayPal and Stripe subscription controls.
- `site/donate.html` — age-gated Buy Me a Coffee and NOWPayments donation page.
- `site/community.html` — community page with right-aligned Discord widget and GitHub Sponsors route.
- `site/privacy.html`, `site/terms.html`, `site/success.html`, `site/404.html` — real HTML destinations.
- `site/sponsors.html` — supplied GitHub Sponsors card page.
- `site/discord.html` — Discord server buttons with a no-auto-redirect adult access flow.
- `site/private-communities.html` — 18+ and country eligibility gate for the private Matrix route.
- `site/thanks.html` — supplied Thanks.dev donation card, using local mascot artwork and the payment age gate.
- Shared animated FED-OS footer — shortened public buttons for ecosystem, membership, storefront, Whop, contact, media, support, Discord, Bluesky, X, artwork, and the gated private communities page.
- `site/css/site.css` — dark animation system, ticker, responsive layout, and no-orbit visual treatment.
- `site/js/site.js` — age gate and navigation behavior.
- `site/assets/favicon.svg`, `logo-symbol.svg` — symbol-only favicon and logo.
- `site/assets/*.svg` — original hero, promo, mascot, donation, and community illustrations.
- `site/assets/signal-loop.gif` — original looping animated signal mascot.
- `site/_headers`, `site/_redirects`, `site/robots.txt`, `site/sitemap.xml`, `site/DEPLOYMENT.md` — static deployment helpers.

- `LICENSE` — MIT license referenced by the package and README.
- `assets/demo/static-site-tour.gif` — real local preview tour rendered from the static pages.
- `assets/screenshots/landing-page.png` — rendered landing-page screenshot.
- `assets/screenshots/community-page.png` — rendered community-page screenshot.
- `assets/screenshots/thanks-gate.png` — rendered Thanks.dev donation-page screenshot.

- `site/login.html` — Join / Login email-list page with Supabase Auth modal, password reset, session state, and logout.
- `site/js/login.js` — Maintainable client-side auth behavior for the Join / Login page.
