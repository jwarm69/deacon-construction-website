# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
A luxury custom home builder website for Deacon Construction LLC in Cashiers, NC. Static HTML/CSS/JavaScript website designed to compete with and exceed competitors like Lupoli Builders in the luxury home market.

## Client Context
- **Business**: Deacon Construction LLC
- **Owner**: Kevin Cler
- **Location**: Cashiers, NC (Western North Carolina mountains)
- **Target Market**: Luxury custom home building
- **Primary Competitor**: Lupoli Builders
- **Service Areas**: Cashiers, Highlands, Sapphire, Lake Glenville, Lake Toxaway

## Development Commands
This is a static website with no build process. View by opening HTML files directly in browser or using a local server:

```bash
# Serve locally (Python 3)
python -m http.server 8000

# Serve locally (Python 2)
python -m SimpleHTTPServer 8000

# Serve locally (Node.js)
npx serve .
```

## Architecture Overview

### Core Structure
- **Static HTML**: Multi-page website with shared navigation and footer
- **CSS Architecture**: Modular stylesheets with CSS custom properties (variables)
- **JavaScript**: Vanilla JS for interactivity, no frameworks
- **Responsive Design**: Mobile-first approach with breakpoints

### Key Pages
- `index.html` - Homepage with hero video, services, featured projects, testimonials
- `pages/our-story.html` - Company history, Kevin Cler's story, timeline
- `pages/portfolio.html` - Filterable project gallery with lightbox
- `pages/contact.html` - Contact forms, map integration, FAQ

### CSS Structure
- `css/styles.css` - Main stylesheet with CSS variables, component styles
- `css/responsive.css` - Mobile breakpoints and responsive overrides
- CSS Variables in `:root` define brand colors, fonts, transitions, shadows

### JavaScript Architecture
- `js/main.js` - Single file containing all interactive functionality
- Event-driven approach with DOMContentLoaded wrapper
- Key features: mobile menu, scroll effects, form validation, testimonial carousel, portfolio filtering

## Design System

### Brand Colors
- Primary: `#1a1a1a` (dark charcoal)
- Secondary: `#8B7355` (warm brown)
- Accent: `#D4AF37` (luxury gold)
- Text: `#2c2c2c` (dark) / `#666666` (light)
- Background: `#ffffff` (white) / `#f8f7f5` (light cream)

### Typography
- Primary: 'Montserrat' (body text, navigation)
- Secondary: 'Playfair Display' (headings, luxury feel)

### Layout Patterns
- Container max-width: 1200px
- Grid layouts for services, portfolio, testimonials
- Consistent 80-100px section padding
- Mobile-first responsive breakpoints

## SEO Implementation

### Target Keywords
- "Cashiers NC custom home builder"
- "Luxury homes Cashiers North Carolina"
- "Mountain home builders Cashiers NC"
- "Custom home construction Cashiers"
- "High-end builders Western NC"

### SEO Features
- Schema.org markup for GeneralContractor
- Open Graph tags for social sharing
- Local business structured data
- Optimized meta descriptions and titles
- Image alt text with location keywords

## Interactive Features

### Portfolio System
- Filterable project categories (mountain-modern, rustic-elegant, contemporary, renovation)
- Lightbox gallery system in `pages/portfolio.html`
- Project overlay effects on hover

### Contact Forms
- Comprehensive lead capture form in `pages/contact.html`
- Form validation with client-side JavaScript
- Google Maps integration placeholder (needs API key)

### Navigation
- Dropdown menus for About and Services sections
- Mobile hamburger menu with smooth transitions
- Active page highlighting
- Smooth scroll behavior

## Content Strategy
The website is designed to position Deacon Construction as the premium choice over competitors through:
- Professional photography placeholders for portfolio projects
- Personal storytelling (Kevin Cler's journey)
- Process transparency and client testimonials
- Awards and recognition sections
- Local area expertise emphasis

## Ready for Implementation
- Image assets need to be added to `/images/` directory
- Contact form backend integration required
- Google Maps API key needed for map functionality
- Google Analytics integration ready
- Domain setup and hosting deployment ready

## Image Asset Structure
Expected image organization:
- `/images/deacon-logo.svg` - Main logo
- `/images/projects/` - Portfolio project images
- `/images/testimonials/` - Client photos
- `/images/icons/` - Service and feature icons
- `/images/awards/` - Recognition and award images