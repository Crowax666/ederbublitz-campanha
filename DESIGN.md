# Eder Bublitz 1020 — Design System

> Contemporary political editorial: human, confident, institutional and unmistakably Paraná. The interface should feel like a serious public-leadership campaign with premium digital-product finishing — never like a generic election template.

## 1. Design intent

The website must communicate, in this order:
1. Presence and credibility.
2. Proximity to people and municipalities.
3. Capacity to deliver results.
4. A clear electoral identity around Eder Bublitz 1020.

The visual system combines campaign energy with editorial restraint. Large typography, authentic photography, generous negative space and controlled color should carry the hierarchy. Avoid decorative UI that competes with the candidate, message or number.

## 2. Core principles

- **Candidate first.** Photography and message are the hero; interface chrome is secondary.
- **Editorial, not template-like.** Use strong layouts, asymmetry where useful, generous spacing and clear typographic hierarchy.
- **Premium through restraint.** Fewer effects, better proportions. Prefer tonal separation over heavy shadows.
- **Human political communication.** Sections should feel warm and approachable, without losing institutional credibility.
- **Mobile is a first-class composition.** Do not merely shrink desktop layouts. Re-compose hierarchy, crop, spacing and CTA placement for small screens.
- **Identity fidelity is mandatory.** Never reconstruct, beautify or alter Eder's physical characteristics. Use original photographic assets and only adjust composition, scale, crop, background integration and global image treatment.

## 3. Reference direction

Use Refero-style systems as evidence, not as layouts to copy.

### Apple-like product discipline
Borrow:
- generous negative space;
- confident single-message sections;
- large-radius surfaces when a card is truly needed;
- restrained shadows;
- focused CTA hierarchy;
- tight headline tracking and controlled line-height.

Do not borrow:
- generic tech-product aesthetics;
- blue CTA language that conflicts with the campaign palette;
- excessive black stages.

### Editorial systems
Borrow:
- strong left alignment;
- visual rhythm between headline, lead and body;
- quiet grids and hairline borders;
- sections that can stand without decorative boxes.

### Campaign-specific interpretation
The result must remain recognizably Eder Bublitz: green, navy, orange, yellow and the official 1020 lockup stay authoritative.

## 4. Color system

Existing palette remains canonical.

```css
--green: #194b36;
--green-deep: #1F5341;
--lime: #59BA47;
--orange: #f36b21;
--orange-ink: #b34700;
--yellow: #ffb51b;
--navy: #071d33;
--paper: #f4f3ee;
--ink: #15362a;
```

### Color roles
- **Navy:** institutional authority, header, deep stages, legal/supporting areas.
- **Green / green-deep:** Paraná, agriculture, proximity, campaign foundation.
- **Orange:** primary political action and emphasis. Use sparingly.
- **Yellow:** signal, underline, micro-detail and party/electoral punctuation.
- **Paper:** default light canvas. Prefer warm paper over pure white for major sections.
- **Lime:** secondary emphasis only; never allow it to become a competing CTA color.

### Rules
- One dominant accent per section.
- Do not place orange, yellow and lime as equal accents in the same small component.
- On light backgrounds, use `--orange-ink` for small text when contrast is required.
- Avoid large flat blocks of saturated orange.

## 5. Typography

Canonical stack:

```css
--font-body: "Avenir Next", "Helvetica Neue", Arial, sans-serif;
--font-display: "Avenir Next Condensed", "Arial Narrow", "Helvetica Neue", Arial, sans-serif;
```

### Display headlines
- condensed, bold/black, often italic;
- uppercase only for major campaign statements;
- tight line-height: approximately 0.88–0.98;
- negative tracking, but never so tight that letters touch;
- desktop hero and major stage titles may be very large;
- on mobile, preserve impact without exceeding comfortable 2–4 line compositions.

### Body
- 16–19px on desktop for primary explanatory text;
- 15–17px on mobile;
- line-height approximately 1.55–1.72;
- use softer ink/white opacity for secondary text, not smaller unreadable type.

### Eyebrows / section labels
- 10–12px;
- uppercase;
- strong weight;
- tracked letter spacing;
- always subordinate to the headline.

## 6. Spacing rhythm

Use an 8px conceptual grid.

Desktop:
- section vertical padding: 96–144px;
- major content gap: 48–80px;
- text block internal gap: 16–32px;
- card gap: 18–28px.

Mobile:
- section vertical padding: 56–80px;
- major content gap: 28–44px;
- component horizontal inset: approximately 20–24px / 6vw;
- preserve clear safe space around floating controls.

Do not reduce spacing just to fit more content above the fold. The site should feel composed, not compressed.

## 7. Shape and elevation

### Cards
- preferred radius: 22–28px for campaign/editorial cards;
- use radius only when there is a meaningful surface;
- avoid placing every paragraph in a card;
- prefer soft tonal backgrounds and 1px borders to heavy projected shadows.

Suggested elevation:
```css
box-shadow: 0 18px 50px rgba(7,29,51,.08);
```

Hover may deepen slightly, but the component should not jump dramatically.

### Buttons
Primary CTA:
- pill or soft rounded rectangle;
- orange on high-contrast stages;
- strong label, compact type;
- generous horizontal padding;
- subtle lift on hover.

Secondary CTA:
- text link, hairline underline or quiet outlined treatment;
- never visually equal to the primary CTA.

Avoid sharp 4px-radius buttons on premium surfaces unless intentionally editorial.

## 8. Header

Desktop:
- navy stage remains authoritative;
- simplify visual density;
- navigation should read as quiet utility, not as a row of competing CTAs;
- material CTA may remain the only filled action.

Mobile:
- sticky header is correct;
- preserve a clear Back/Menu behavior;
- keep candidate/brand recognition legible at a glance;
- controls must meet comfortable tap targets (~44px minimum);
- avoid crowding logo, jingle and menu.

## 9. Hero

The hero is the strongest campaign stage.

### Desktop
- keep the authentic Eder portrait dominant;
- number 1020 and slogan must read as one composition, not separate stickers;
- use a softer, more cinematic green gradient with less visible decoration;
- reduce pattern prominence;
- avoid multiple competing bottom-edge effects;
- CTA cluster should be simple and decisive.

### Mobile
- treat as an independent art direction;
- portrait crop must feel intentional and never leak horizontally;
- 1020 should be visible without covering Eder's face or creating visual congestion;
- slogan should remain legible in the first viewport;
- transitions between image and background must be soft, without a pasted-photo look.

## 10. Section transitions

Do not rely on hard alternating rectangles alone.

Allowed:
- tonal shifts between warm paper, deep navy and green;
- image-led full-bleed sections;
- subtle gradient bridges;
- oversized typographic or photographic anchors;
- occasional curved/soft surface transitions only when structurally useful.

Avoid:
- decorative waves everywhere;
- repeated diagonal separators;
- stacked colored strips that make the site look like a flyer.

## 11. Proposal / pillar cards

Pillars should feel like editorial campaign commitments, not dashboard widgets.

- use generous radius (22–28px);
- reduce shadow opacity;
- stronger number/eyebrow hierarchy;
- title should dominate;
- arrow action stays simple;
- consider a quiet tonal variation between cards rather than equal white boxes;
- on mobile, cards should be full-width with clear separation and no hover-dependent affordance.

## 12. Photography

- use supplied campaign photography whenever possible;
- preserve faces and physical features exactly;
- use natural color; avoid over-saturation and artificial skin treatment;
- crop for narrative intent;
- full-bleed images may use subtle navy/green overlays for text legibility;
- transitions into adjacent backgrounds should use gradients/masks instead of visible rectangular photo edges when appropriate.

## 13. Motion

Motion should communicate polish, not novelty.

Use:
- 180–350ms UI transitions;
- 500–900ms first-load hero reveals;
- slight translateY/opacity entrances;
- gentle image scale/parallax where supported;
- stagger only for meaningful hierarchy.

Do not use:
- bouncing;
- elastic effects;
- excessive spinning/sliding;
- motion that delays reading or interaction.

Always honor `prefers-reduced-motion`.

## 14. Mobile-specific rules

- design every major section at 390px viewport width before considering it complete;
- no horizontal overflow;
- no text touching viewport edges;
- no CTA smaller than comfortable tap size;
- images must not produce accidental empty bands or hard cuts;
- stacked sections should preserve narrative order: message → visual → action where possible;
- floating WhatsApp and back-to-top controls must not cover form actions or legal content.

## 15. Accessibility

- WCAG AA contrast for normal text;
- visible keyboard focus;
- meaningful alt text for informative photography;
- decorative images/patterns should not create duplicate screen-reader content;
- touch targets ~44px minimum;
- do not encode meaning only through color.

## 16. Do

- Use authentic, large photography.
- Let one campaign statement dominate each section.
- Give headlines breathing room.
- Keep the 1020 identity prominent but composed.
- Prefer one strong CTA over several equal buttons.
- Use warm-paper surfaces and dark institutional stages.
- Keep desktop and mobile art direction related but not identical.
- Treat the site as a contemporary political editorial experience.

## 17. Don't

- Do not make the site look like a SaaS dashboard.
- Do not turn every content block into a card.
- Do not use glassmorphism as a default language.
- Do not overuse drop shadows.
- Do not use excessive gradients or glows.
- Do not introduce new campaign colors without a specific reason.
- Do not alter candidate facial/body features.
- Do not create generic stock-election imagery.
- Do not shrink desktop layouts blindly for mobile.

## 18. Implementation priority

When polishing an existing page, work in this order:
1. Mobile overflow and composition defects.
2. Hero hierarchy and photo integration.
3. Section spacing and transitions.
4. Proposal/card system.
5. Typography rhythm.
6. Buttons and microinteractions.
7. Decorative details.

When a design choice conflicts with this file, prefer clarity, authenticity and campaign identity over novelty.
