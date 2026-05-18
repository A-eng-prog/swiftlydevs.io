# swiftlydevs.io

Static project portal for **Projects By Swiftly** and Swiftly's Catweb Roblox websites.

## Files

- `index.html` - main project download UI.
- `styles.css` - responsive styling.
- `app.js` - search, tab, filter, and JSON rendering behavior.
- `catweb.json` - Catweb manifest.
- `websites.json` - Catweb website records.
- `CNAME` - GitHub Pages custom domain for `swiftlydevs.io`.
- `.nojekyll` - tells GitHub Pages to serve files as a plain static site.
- `downloads/` - downloadable example project files.

## GitHub Pages

Use these GitHub Pages settings:

- Source: deploy from branch
- Branch: `main`
- Folder: `/root`
- Custom domain: `swiftlydevs.io`

For security, keep the CSP meta tag in `index.html`, serve the site over HTTPS, and enable these response headers if your host supports custom headers:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
