# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in this site, please report it responsibly:

**Email:** devamshah91@gmail.com
**LinkedIn:** [linkedin.com/in/thedevam](https://www.linkedin.com/in/thedevam/)

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Measures in Place

- **XSS Protection:** User input in the chat widget is rendered via `textContent` / text nodes only; no `innerHTML` for any user-controlled data.
- **No Inline Scripts:** All JavaScript is in external files with `defer` attribute, wrapped in IIFEs to prevent global leakage.
- **Content Security Policy:** Meta CSP enforced in `<head>` — `default-src 'self'`, third-party scripts whitelisted explicitly (Plausible only).
- **Referrer-Policy:** `strict-origin-when-cross-origin`.
- **X-Content-Type-Options:** `nosniff`.
- **No Server-Side Code:** Static site — no database, no API keys, no server vulnerabilities.
- **Dependency-Free:** No npm packages, no third-party JS libraries (analytics via Plausible CDN).
- **HTTPS Only:** Served via GitHub Pages with enforced HTTPS.

## Scope

This is a static portfolio site. The attack surface is limited to:
- Client-side JavaScript (chat widget input handling)
- External resource loading (Google Fonts, optional analytics)

## Out of Scope

- Social engineering attacks
- Denial of service
- Issues in third-party services (GitHub Pages, Google Fonts, Plausible)
