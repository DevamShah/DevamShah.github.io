# devamshah.github.io

Personal portfolio site for **Dr. Devam R Shah** — Chief Information Security Officer & Data Protection Officer.

**Live:** [devamshah.github.io](https://devamshah.github.io)

## About

Executive portfolio showcasing 10+ years of cybersecurity leadership across AI SaaS, healthcare, logistics, edtech, robotics, and defence. Currently CISO & DPO at Locus (Ingka Group | IKEA).

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — modular architecture (10 files), CSS variables, Retina/HiDPI optimizations
- **Vanilla JS** — no frameworks, no build step, 6 modular files
- **Fonts** — Instrument Serif, JetBrains Mono, Outfit (Google Fonts)
- **Hosting** — GitHub Pages (HTTP/2)

## Features

- Dark navy/gold executive theme
- Hero with professional headshot, terminal animation, status panel
- Interactive cards with click-to-highlight across all sections
- AI chat widget (simulated, keyword-matching)
- Live epoch clock (ticking since July 2015)
- Scroll-reveal animations with `IntersectionObserver`
- Keyboard shortcuts (press `?` to see them)
- Konami code easter egg
- Visitor session counter with flip animation
- Photo lightbox gallery
- Mobile-first responsive (1440px, 1024px, 720px, 400px)
- Retina/HiDPI: hairline borders, subpixel rendering, GPU compositing

## Accessibility

- WCAG 2.1 AA compliant
- Skip-to-content link
- `aria-labelledby` on all sections
- `role="dialog"` on modals
- `prefers-reduced-motion` support
- `:focus-visible` states on all interactive elements
- Keyboard navigation (Tab, Enter, Space, Escape)

## Security

- XSS-safe chat input (`escapeHTML` sanitization)
- No inline scripts (all external, deferred)
- Content Security Policy ready
- No third-party dependencies (except Google Fonts + optional analytics)

## Analytics

- **Google Analytics 4** — replace `G-XXXXXXXXXX` in `index.html` with your Measurement ID
- **Plausible** — configured for `devamshah.github.io`, sign up at [plausible.io](https://plausible.io)

## Project Structure

```
├── index.html              # Main HTML
├── css/
│   ├── base.css            # Variables, reset, typography, retina, animations
│   ├── layout.css          # Header, nav, footer, contact, buttons
│   ├── hero.css            # Hero section, terminal, panel, metrics, ticker
│   ├── about.css           # About cards, gallery, lightbox, quote, tags
│   ├── expertise.css       # Expertise tiles
│   ├── career.css          # Career timeline
│   ├── projects.css        # Project cards, OSS CTA
│   ├── credentials.css     # Education, certifications, awards
│   ├── widgets.css         # Clock, chat, counter, shortcuts
│   └── responsive.css      # All breakpoints + print + safe-area
├── js/
│   ├── app.js              # Scroll, nav, interactions, lightbox
│   ├── terminal.js         # Hero terminal typing
│   ├── counters.js         # Metric scramble + count animation
│   ├── clock.js            # Epoch timer
│   ├── chat.js             # AI chat
│   └── widgets.js          # Counter, shortcuts, konami
└── assets/
    ├── website_headshot.png # Profile photo
    ├── quantic-award.jpeg   # Quantic India Award 2025
    ├── ikea-team.jpeg       # IKEA/Ingka team
    ├── ivalue-award.jpeg    # CISO of the Year award
    ├── cxo-speaker.jpeg     # CXO Conference speaker
    ├── og-card.png          # Social share image (1200x630)
    └── devam.png            # Legacy photo
```

## License

All rights reserved. Content and design are proprietary to Dr. Devam R Shah.

## Built With

Designed and engineered with [Claude Code](https://claude.ai/code) (Claude Opus 4.6).
