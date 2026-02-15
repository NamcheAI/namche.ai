# namche.ai Styleguide

Based on the Mycelia Brand System. Full visual reference: `namche-styleguide.html`

## Concept

namche.ai is the central hub for Jodok Batlogg's AI work.
Named after Namche Bazaar, the mountain town in Nepal that serves as the gateway to the Himalayas.

The brand combines Buddhist principles (without religiosity) with technology:
- Mindfulness
- Cause and effect
- Reduction of noise
- Clarity through simplicity

Visual principle: organic and technical forms merge (round + angular = hybrid).

---

## Logo

### Symbol: "N" in 3x3 Grid

Grid: 3x3 blocks (X=80), gap Y = X/8 = 10. Total symbol: 280x280.

**Construction:**
```
[Square       ] [Quarter-circle ↘] [empty  ]
[Square       ] [Quarter-circle ↘] [Square ]
[Square       ] [empty            ] [Square ]
```

- Left column: 3 squares (full vertical bar)
- Top-center [0,1]: quarter circle sweeping right-down
- Center [1,1]: quarter circle (quadratic bezier, connects diagonal)
- Right column: bottom 2 squares [1,2] and [2,2]

### Basic Shapes

Three shapes fill a single block: **square**, **quarter circle**, **half circle**.
Shapes rotate in 90-degree increments and can expand to neighboring blocks.

### Logo with Type

- Wordmark: Inter Bold, letter-spacing -0.5px
- Symbol left, type right
- Usable in: black on white, white on dark, primary-colored symbol, secondary-colored symbol

### App Icon / Favicon

- Symbol on Primary/Dark background, rounded corners
- Favicon: increased padding (shape/space 1/4 instead of 1/8)

---

## Colors

Each color in three levels: dark, full, light.
"Full" brightness between 50-80 HSB.

### Namche Primary: Slate Blue

| Level | Hex     |
|-------|---------|
| Dark  | #1E2A4A |
| Full  | #3B5998 |
| Light | #B8C9E8 |

### Namche Secondary: Muted Gold

| Level | Hex     |
|-------|---------|
| Dark  | #6B5A2F |
| Full  | #C4A44A |
| Light | #EDE0B8 |

### Tashi Product Palette

| Level | Hex     |
|-------|---------|
| Dark  | #2D4A3E |
| Full  | #5B9A82 |
| Light | #C8E6D8 |

### Neutrals: Stone

| Token     | Hex     |
|-----------|---------|
| stone-900 | #1A1A1A |
| stone-700 | #404040 |
| stone-500 | #737373 |
| stone-300 | #D4D4D4 |
| stone-100 | #F5F5F5 |
| white     | #FFFFFF |

---

## Typography

| Role          | Font       | Weight        |
|---------------|------------|---------------|
| Logo/Headlines| Inter      | Bold (-0.02em)|
| Body          | Inter      | Regular, 16px, line-height 1.6-1.7 |
| Labels/Data   | Space Mono | Regular, 11-12px, uppercase, letter-spaced |
| Fallback      | Arial      | -             |

---

## Composition

### Background Pattern

Logo symbol elements in three sizes:
- Width / 28 * 26
- Width / 19 * 26
- Width / 10 * 26

### Color Application

1. Choose background color (e.g., Gold/Full)
2. Choose pattern color from opposite hue (e.g., Blue/Full)
3. Apply linear gradient (0% to 100% transparency) to pattern
4. Logo always in black or white
5. Same shade pairing rule: e.g., Blue/Light + Gold/Light

### Positioning

- Logo size = canvas longest side / 16-24
- Logo always in corner positions
- Type in black or white only, always high contrast
- Symbol usable standalone; type never without symbol

---

## Design Principles

- Clarity over decoration
- Generous whitespace
- High contrast
- Restraint in color: little, but deliberate
- No excess, no emojis, no pathos
