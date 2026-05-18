# swiftlydevs.io

Static project portal for **Projects By Swiftly** and Swiftly's Catweb Roblox websites.

## Files

- `index.html` - main project download UI.
- `styles.css` - responsive styling.
- `app.js` - search, tab, filter, and JSON rendering behavior.
- `catweb.json` - Catweb manifest.
- `websites.json` - Catweb website records.
- `.nojekyll` - tells GitHub Pages to serve files as a plain static site.
- `downloads/` - downloadable example project files.

## Public URL

GitHub Pages public URL:

`https://a-eng-prog.github.io/swiftlydevs.io/`

If Pages is not live yet, open the repository settings and choose **Pages** -> **Build and deployment** -> **Source: GitHub Actions**.

Do not set a custom domain until `swiftlydevs.io` is a registered domain.

For security, keep the CSP meta tag in `index.html`, serve the site over HTTPS, and enable these response headers if your host supports custom headers:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
