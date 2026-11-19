# Static deployment

The `site/` directory is a standalone static HTML package. It does not require a Manus website or Manus hosting.

## GitHub Pages

Upload the contents of `site/` to the publishing branch or configure GitHub Pages to use `site/` as the source directory. Keep the HTML files, `css/`, `js/`, and `assets/` paths together. The included `404.html` is the GitHub Pages fallback.

## Cloudflare Pages

Create a Pages project connected to the repository and set the build command to empty. Set the output directory to `site`. The `_headers` and `_redirects` files are included for Cloudflare Pages behavior. If using a Cloudflare Worker instead of Pages, serve the `site/` directory as static assets and preserve the same paths.

## Before launch

Replace `https://example.com` in `robots.txt` and `sitemap.xml` with the real public domain. Replace the placeholder Stripe checkout fallback only if you want a hosted link in addition to the supplied Stripe Buy Button. Payment provider accounts, pricing, tax, age/consent compliance, and refund policy remain the operator's responsibility.

## Included design upgrades

Every page has a symbol-only SVG favicon. The landing page and inner pages share an animated, dark current-field effect and an infinite scrolling header ticker. The promo art is original local SVG/GIF artwork. Ko-fi is not included. Payment controls are split into subscription and donation lanes and are hidden behind a simple 18+ front-end gate. Discord is placed in a right-aligned panel on the community page and becomes single-column on mobile.

## Footer routing

The animated FED-OS footer includes public ecosystem, membership, storefront, Whop, contact, media, support, developer, Bluesky, X, and artwork buttons. Facebook and the personal Substack are intentionally omitted. The Matrix URL is not in the footer; it is revealed only by `private-communities.html` after an 18+ checkbox and eligible-country selection.
