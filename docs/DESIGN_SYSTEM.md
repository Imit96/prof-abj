# Cinematic Web: Design System

## Project Context
**Principal:** Dr. Amos Olalekan Abolaji
**Vibe:** Academic Prestige, Cinematic Scale, Research Authority.
**Goal:** Deliver a jaw-dropping personal & professional portfolio that elevates his Drosophila research, academic standing, and personal values.

## Color Palette (Tailwind Tokens)
- **Primary (Oxford):** `#0F172A` (deepest slate/blue for primary backgrounds in dark mode or deep academic sections)
- **Secondary (Oxbridge Gold):** `#D4AF37` (for striking accents, awards, buttons)
- **Background (Canvas):** `#FAFAFA` (smooth off-white for reading sections)
- **Text (Ink):** `#1E293B` (slate-800 for high readability)
- **Drosophila Accent (Crimson/Amber mix):** `#C84B31` (used sparingly for research highlights)

## Typography 
- **Headings:** `Inter` or `Playfair Display` (for serif, prestigious academic feel). We'll use a combination (Playfair for large hero titles, Inter for UI fonts).
- **Body:** `Inter` (clean, highly readable).

## Motion Principles (GSAP & Lenis)
- **Scrolling:** Smooth, buttery feel via Lenis.
- **Hero/Abstract:** Slow, cinematic scale-ins (Ken Burns effect) on background imagery, synchronized with staggered text reveals.
- **Section Transitions:** Scrubbed fade-ins and subtle y-axis parallax as the user scrolls down the resume timeline or lab history.
- **Micro-interactions:** Hover effects on buttons (Framer Motion) feeling magnetic and responsive.

## UI Components
1. **Academic Navbar:** Transparent on top, glassmorphism on scroll, with a prominent "Contact" CTA.
2. **Resume Timeline:** A vertical line where nodes illuminate as they enter the viewport.
3. **Publication Cards:** Clean white cards with subtle drop shadows that elevate on hover.

*Note: This is the persistent design ledger. Follow these tokens strictly when creating React components.*
