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

- **XSS Protection:** All user input (chat widget) is sanitized via `escapeHTML()` before DOM insertion
- **No Inline Scripts:** All JavaScript is in external files with `defer` attribute
- **Content Security Policy:** Ready for CSP headers (no inline JS/CSS dependencies)
- **No Server-Side Code:** Static site — no database, no API keys, no server vulnerabilities
- **Dependency-Free:** No npm packages, no third-party JS libraries
- **HTTPS Only:** Served via GitHub Pages with enforced HTTPS

## Scope

This is a static portfolio site. The attack surface is limited to:
- Client-side JavaScript (chat widget input handling)
- External resource loading (Google Fonts, optional analytics)

## Out of Scope

- Social engineering attacks
- Denial of service
- Issues in third-party services (GitHub Pages, Google Fonts, Plausible)
