# Contributing

This is a personal portfolio site. While the code structure and design patterns are open source, contributions are limited to:

- Bug fixes (layout issues, broken interactions, accessibility improvements)
- Performance optimizations
- Cross-browser compatibility fixes

## How to Report Issues

Open an issue on GitHub describing:
1. What you expected to happen
2. What actually happened
3. Browser, OS, and screen size
4. Screenshot if applicable

## Local Development

No build step required. Clone and open `index.html` in a browser:

```bash
git clone https://github.com/DevamShah/DevamShah.github.io.git
cd DevamShah.github.io
open index.html
```

## Code Style

- CSS: one file per section, BEM-like naming, CSS variables for all colors
- JS: vanilla only, no frameworks, IIFE pattern for isolation
- HTML: semantic elements, accessibility attributes required
