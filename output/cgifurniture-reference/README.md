# CGIFurniture reference capture

Source: https://cgifurniture.com/
Captured: 2026-06-11

This folder is the working reference library for translating the CGIFurniture interaction model into the portfolio site while keeping our own visual style, typography, color system, and project imagery.

## Screenshot inventory

- `fullpage/desktop-fullpage.png` - desktop full-page capture, 1431 x 10561.
- `fullpage/mobile-fullpage.png` - mobile full-page capture, 381 x 11675.
- `desktop/*.png` - 36 desktop viewport scroll captures, including raw consent-popup hero and dense page coverage.
- `mobile/*.png` - 34 mobile viewport scroll captures.
- `animation/stacked-industry-*.png` - 10 dense scroll frames through the stacked industry/service card sequence.
- `animation/desktop-nav-services-dropdown-clean.png` - clean services mega menu with category columns and image headers.
- `animation/desktop-nav-insights-dropdown-clean.png` - clean insights mega menu with three featured content cards.
- `animation/desktop-header-scroll-*.png` - header top, scroll-down, and scroll-up reveal states.
- `animation/desktop-services-carousel-*.png` - service carousel initial, card, hover, and shifted states.
- `animation/desktop-estimate-modal-step-0.png` plus `desktop-estimator-step-*.png` - estimator flow reference.
- `animation/desktop-estimator-step-4-clean.png` - calendar/time-slot/upload flow at the estimator completion step.
- `animation/desktop-testimonials-*.png` - review carousel before and after next interaction.
- `animation/desktop-faq-*-clean.png` and `desktop-faq-*-dom-clean.png` - FAQ closed and expanded states.
- `animation/mobile-hero-device-clean.png`, `mobile-menu-open-device-clean.png`, and `mobile-services-submenu-device-clean.png` - true mobile user-agent captures for hero, menu, and services submenu.
- `animation/desktop-dark-mode-state.png` and `desktop-dark-mode-clean.png` - dark-mode visual state references.

Known throwaway captures:

- `animation/desktop-estimator-section.png` is blank.
- `animation/desktop-dark-mode-toggle.png` is blank.

## Pattern extraction

1. Hero: full-bleed visual background, central headline, two calls to action, sticky top nav, and a curved handoff into the next section.
2. Trust/positioning band: short proof line immediately below hero, visually integrated into the curved section transition.
3. Services: instead of plain cards only, services are grouped into a navigable offer system with categories, imagery, and clear deliverables.
4. Scroll storytelling: stacked sticky panels pair a dark text column with a large image; scroll progress reveals one category at a time.
5. Mega menus: desktop nav uses image-led dropdown panels for services and insights, not just text links.
6. Estimator: quote/pricing logic is presented as a multi-step configurator with large selectable visual cards.
7. Micro-motion: hover pills, image scale, scroll reveal, sticky panels, and modal step transitions create the premium feel.
8. Mobile: the same order is preserved, but panels become vertical blocks and the hero CTA stack stays simple.
9. Header behavior: transparent/large at the top, compact or hidden while scrolling down, then visible again on upward scroll.
10. Carousel behavior: services and reviews are horizontal systems, with hover reveal on desktop and visible copy on mobile.

## Translation rules for our site

- Keep our restrained portfolio palette, spacing rhythm, and image language.
- Use Framer Motion for scroll reveals, sticky transitions, hover feedback, and estimator steps.
- Adapt the service system to our real offerings: product renders, lifestyle scenes, technical/3D modeling support, animation, and launch-ready deliverables.
- Avoid copying CGIFurniture brand assets, exact text, logos, chat widget, or furniture-specific claims.
- Use the reference as structure and motion behavior, not as a visual clone.

## Implementation priorities

1. Build the same page order in our style: full-bleed hero, proof band, sticky service/use-case stack, service carousel, estimator, proof/reviews, FAQ, CTA/footer.
2. Use Framer Motion for hero entry, scroll-linked panel stacking, card hover reveal, estimator step transitions, and mobile menu animation.
3. Add desktop services/insights mega-menu behavior in our header using our project categories and portfolio language.
4. Strengthen the curved hero-to-proof transition and below-hero proof band without copying CGIFurniture visuals or wording.
5. Convert the service offer into a horizontal carousel on desktop with hover reveal and a copy-visible mobile layout.
6. Keep the estimator as our own scope builder, but match the reference's clarity: visual selection states, step labels, summary, and scheduling/upload handoff.
7. Verify desktop and mobile screenshots after every layout pass against this folder.

## Subagent audit notes

Mencius mapped the desktop structure as a layered sales page: header, immersive hero, proof/logo band, category/use-case intro, large use-case cards, service grid, estimator, testimonials/trust, FAQ, lead capture and footer. The key takeaway is that the reference sells a scalable content system rather than isolated nice renders.

Turing mapped the motion system: autoplay hero visuals, header hide-on-scroll, sticky cards that scale back as new panels enter, image-led services mega-menu, compact insights dropdown, estimator step transitions, hover-lift cards, mobile hamburger states and stacked mobile CTAs.

Implementation status:

- Header now has hide-on-scroll behavior and an image-led services mega-menu.
- Services page has direct anchors for `#service-story`, `#service-menu` and `#brief-builder`.
- The service story cards now use scroll-linked scale and opacity.
- The estimator now runs as a four-step animated brief builder.
