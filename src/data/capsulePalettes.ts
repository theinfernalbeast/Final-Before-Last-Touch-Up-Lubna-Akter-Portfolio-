export interface CapsulePalette {
  id: string;
  family: 'baby-pink' | 'ocean-blue' | 'blush' | 'lavender';
  familyLabel: string;
  shadeName: string;
  name: string;
  // Colored side (top cap)
  capDark: number;
  capLight: number;
  // White side (bottom body) - pristine white kept intact across all variations
  bodyDark: number; // 0xffffff
  bodyLight: number; // 0xf8fafc
  // Hex strings for UI selectors
  capHexDark: string;
  capHexLight: string;
  glowColor: number;
  molecularColors: number[];
}

export const CAPSULE_PALETTES: CapsulePalette[] = [
  // ==========================================
  // 1. BABY PINK FAMILY (5 Cohesive Shades)
  // ==========================================
  {
    id: 'baby-pink-classic',
    family: 'baby-pink',
    familyLabel: 'Baby Pink',
    shadeName: 'Classic Petal',
    name: 'Classic Baby Pink & White',
    capDark: 0xf472b6,     // Delicate petal baby pink
    capLight: 0xf9a8d4,    // Soft baby blossom
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#f472b6',
    capHexLight: '#f9a8d4',
    glowColor: 0xf472b6,
    molecularColors: [0xf472b6, 0xffffff, 0xfbcfe8, 0xfce7f3, 0xfef08a],
  },
  {
    id: 'baby-pink-powder',
    family: 'baby-pink',
    familyLabel: 'Baby Pink',
    shadeName: 'Cotton Powder',
    name: 'Powder Baby Pink & White',
    capDark: 0xf9a8d4,     // Ultra-delicate ethereal cotton candy pink
    capLight: 0xfbcfe8,    // Whisper of marshmallow pink
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#f9a8d4',
    capHexLight: '#fbcfe8',
    glowColor: 0xf9a8d4,
    molecularColors: [0xf9a8d4, 0xffffff, 0xfbcfe8, 0xfdf2f8, 0xffedd5],
  },
  {
    id: 'baby-pink-warm-rose',
    family: 'baby-pink',
    familyLabel: 'Baby Pink',
    shadeName: 'Warm Flamingo',
    name: 'Warm Rose Pink & White',
    capDark: 0xf06292,     // Luminous warm flamingo-tinted rose pink
    capLight: 0xf48fb1,    // Sunlit pink rosebud
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#f06292',
    capHexLight: '#f48fb1',
    glowColor: 0xf06292,
    molecularColors: [0xf06292, 0xffffff, 0xf8bbd0, 0xfce4ec, 0xfef9c3],
  },
  {
    id: 'baby-pink-blushing-orchid',
    family: 'baby-pink',
    familyLabel: 'Baby Pink',
    shadeName: 'Blushing Orchid',
    name: 'Blushing Orchid Pink & White',
    capDark: 0xec4899,     // Vibrant modern magenta-pink
    capLight: 0xf472b6,    // Bright soft pink
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#ec4899',
    capHexLight: '#f472b6',
    glowColor: 0xec4899,
    molecularColors: [0xec4899, 0xffffff, 0xf472b6, 0xfbcfe8, 0xfef08a],
  },
  {
    id: 'baby-pink-frosty-quartz',
    family: 'baby-pink',
    familyLabel: 'Baby Pink',
    shadeName: 'Frosty Quartz',
    name: 'Frosty Quartz Pink & White',
    capDark: 0xf43f5e,     // Glossy rose quartz
    capLight: 0xfb7185,    // Light frosty pink
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#f43f5e',
    capHexLight: '#fb7185',
    glowColor: 0xf43f5e,
    molecularColors: [0xf43f5e, 0xffffff, 0xfb7185, 0xfecdd3, 0xfef9c3],
  },

  // ==========================================
  // 2. OCEAN BLUE FAMILY (5 Cohesive Shades)
  // ==========================================
  {
    id: 'ocean-blue-classic',
    family: 'ocean-blue',
    familyLabel: 'Ocean Blue',
    shadeName: 'Azure Breeze',
    name: 'Ocean Blue & White',
    capDark: 0x38bdf8,     // Vibrant tropical azure ocean
    capLight: 0x7dd3fc,    // Clear sunlight reef blue
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#38bdf8',
    capHexLight: '#7dd3fc',
    glowColor: 0x38bdf8,
    molecularColors: [0x38bdf8, 0xffffff, 0xbae6fd, 0xe0f2fe, 0xfef08a],
  },
  {
    id: 'ocean-blue-deep-marine',
    family: 'ocean-blue',
    familyLabel: 'Ocean Blue',
    shadeName: 'Deep Marine',
    name: 'Deep Marine Ocean & White',
    capDark: 0x0284c7,     // Rich crystal sapphire deep ocean
    capLight: 0x38bdf8,    // Luminous cobalt sea
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#0284c7',
    capHexLight: '#38bdf8',
    glowColor: 0x0ea5e9,
    molecularColors: [0x0284c7, 0xffffff, 0x38bdf8, 0xbae6fd, 0xe0f2fe],
  },
  {
    id: 'ocean-blue-aqua-seafoam',
    family: 'ocean-blue',
    familyLabel: 'Ocean Blue',
    shadeName: 'Aqua Seafoam',
    name: 'Aqua Seafoam & White',
    capDark: 0x06b6d4,     // Crisp cyan-infused ocean water
    capLight: 0x22d3ee,    // Translucent aquamarine seafoam
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#06b6d4',
    capHexLight: '#22d3ee',
    glowColor: 0x06b6d4,
    molecularColors: [0x06b6d4, 0xffffff, 0x67e8f9, 0xcffafe, 0xfef9c3],
  },
  {
    id: 'ocean-blue-glacier-frost',
    family: 'ocean-blue',
    familyLabel: 'Ocean Blue',
    shadeName: 'Glacier Frost',
    name: 'Glacier Frost Blue & White',
    capDark: 0x0ea5e9,     // Deep glacier blue
    capLight: 0x38bdf8,    // Icy frost blue
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#0ea5e9',
    capHexLight: '#38bdf8',
    glowColor: 0x0ea5e9,
    molecularColors: [0x0ea5e9, 0xffffff, 0x38bdf8, 0xe0f2fe, 0xfef08a],
  },
  {
    id: 'ocean-blue-midnight-teal',
    family: 'ocean-blue',
    familyLabel: 'Ocean Blue',
    shadeName: 'Midnight Teal',
    name: 'Midnight Teal Blue & White',
    capDark: 0x0d9488,     // Deep opulent teal
    capLight: 0x14b8a6,    // Luminous bright teal
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#0d9488',
    capHexLight: '#14b8a6',
    glowColor: 0x0d9488,
    molecularColors: [0x0d9488, 0xffffff, 0x14b8a6, 0x99f6e4, 0xfef9c3],
  },

  // ==========================================
  // 3. BLUSH FAMILY (5 Cohesive Shades - No Orange)
  // ==========================================
  {
    id: 'blush-classic-rose',
    family: 'blush',
    familyLabel: 'Blush',
    shadeName: 'Classic Tea Rose',
    name: 'Blush & White',
    capDark: 0xfb7185,     // Elegant tea rose cosmetic blush
    capLight: 0xfda4af,    // Soft petal blush tint
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#fb7185',
    capHexLight: '#fda4af',
    glowColor: 0xfb7185,
    molecularColors: [0xfb7185, 0xffffff, 0xfecdd3, 0xffe4e6, 0xfef08a],
  },
  {
    id: 'blush-soft-petal',
    family: 'blush',
    familyLabel: 'Blush',
    shadeName: 'Soft Rosy Petal',
    name: 'Soft Rosy Blush & White',
    capDark: 0xf43f5e,     // Romantic rose blush
    capLight: 0xfb7185,    // Tender rosy pink
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#f43f5e',
    capHexLight: '#fb7185',
    glowColor: 0xf43f5e,
    molecularColors: [0xf43f5e, 0xffffff, 0xfb7185, 0xfecdd3, 0xfef9c3],
  },
  {
    id: 'blush-deep-peony',
    family: 'blush',
    familyLabel: 'Blush',
    shadeName: 'Deep Peony',
    name: 'Deep Peony Blush & White',
    capDark: 0xe11d48,     // Rich velvet peony rose
    capLight: 0xf43f5e,    // Radiant crimson petal
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#e11d48',
    capHexLight: '#f43f5e',
    glowColor: 0xe11d48,
    molecularColors: [0xe11d48, 0xffffff, 0xf43f5e, 0xfecdd3, 0xfef08a],
  },
  {
    id: 'blush-magenta-glow',
    family: 'blush',
    familyLabel: 'Blush',
    shadeName: 'Magenta Glow',
    name: 'Magenta Glow Blush & White',
    capDark: 0xd946ef,     // Vibrant fuchsia magenta
    capLight: 0xe879f9,    // Soft orchid pink
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#d946ef',
    capHexLight: '#e879f9',
    glowColor: 0xd946ef,
    molecularColors: [0xd946ef, 0xffffff, 0xe879f9, 0xf5d0fe, 0xfef08a],
  },
  {
    id: 'blush-velvet-berry',
    family: 'blush',
    familyLabel: 'Blush',
    shadeName: 'Velvet Berry',
    name: 'Velvet Berry Blush & White',
    capDark: 0xbe123c,     // Deep luscious berry
    capLight: 0xe11d48,    // Luminous bright berry
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#be123c',
    capHexLight: '#e11d48',
    glowColor: 0xbe123c,
    molecularColors: [0xbe123c, 0xffffff, 0xe11d48, 0xfecdd3, 0xfef08a],
  },

  // ==========================================
  // 4. LAVENDER FAMILY (5 Cohesive Shades)
  // ==========================================
  {
    id: 'lavender-classic',
    family: 'lavender',
    familyLabel: 'Lavender',
    shadeName: 'French Lavender',
    name: 'Lavender & White',
    capDark: 0xc084fc,     // Radiant French botanical lavender
    capLight: 0xd8b4fe,    // Soft lilac lavender mist
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#c084fc',
    capHexLight: '#d8b4fe',
    glowColor: 0xc084fc,
    molecularColors: [0xc084fc, 0xffffff, 0xe9d5ff, 0xf3e8ff, 0xfef9c3],
  },
  {
    id: 'lavender-periwinkle',
    family: 'lavender',
    familyLabel: 'Lavender',
    shadeName: 'Periwinkle Lilac',
    name: 'Periwinkle Lilac & White',
    capDark: 0x818cf8,     // Dreamy periwinkle-tinted twilight lilac
    capLight: 0xa5b4fc,    // Ethereal twilight mist
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#818cf8',
    capHexLight: '#a5b4fc',
    glowColor: 0x818cf8,
    molecularColors: [0x818cf8, 0xffffff, 0xc4b5fd, 0xe0e7ff, 0xfef08a],
  },
  {
    id: 'lavender-royal-orchid',
    family: 'lavender',
    familyLabel: 'Lavender',
    shadeName: 'Royal Orchid',
    name: 'Royal Orchid & White',
    capDark: 0xa855f7,     // Deep vibrant jewel-toned orchid violet
    capLight: 0xc084fc,    // Luminous wisteria petal
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#a855f7',
    capHexLight: '#c084fc',
    glowColor: 0xa855f7,
    molecularColors: [0xa855f7, 0xffffff, 0xd8b4fe, 0xf5d0fe, 0xfef08a],
  },
  {
    id: 'lavender-amethyst-glow',
    family: 'lavender',
    familyLabel: 'Lavender',
    shadeName: 'Amethyst Glow',
    name: 'Amethyst Glow & White',
    capDark: 0x9333ea,     // Rich deep amethyst
    capLight: 0xa855f7,    // Luminous lavender crystal
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#9333ea',
    capHexLight: '#a855f7',
    glowColor: 0x9333ea,
    molecularColors: [0x9333ea, 0xffffff, 0xa855f7, 0xe9d5ff, 0xfef08a],
  },
  {
    id: 'lavender-silky-mauve',
    family: 'lavender',
    familyLabel: 'Lavender',
    shadeName: 'Silky Mauve',
    name: 'Silky Mauve & White',
    capDark: 0x8b5cf6,     // Sleek violet-mauve
    capLight: 0xa78bfa,    // Soft satin mauve
    bodyDark: 0xffffff,
    bodyLight: 0xf8fafc,
    capHexDark: '#8b5cf6',
    capHexLight: '#a78bfa',
    glowColor: 0x8b5cf6,
    molecularColors: [0x8b5cf6, 0xffffff, 0xa78bfa, 0xede9fe, 0xfef9c3],
  },
];
