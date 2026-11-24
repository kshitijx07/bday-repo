/* ===========================================================
   STORY CONTENT — NEHA & KSHITIJ
   Aesthetic, intimate, minimal editorial poetry.
   Pinterest-style curation, romantic & electric.
   =========================================================== */

const img = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

export interface MemoryPhoto {
  src: string;
  alt: string;
  caption: string;
  poeticNote: string;
  rotation: number;
}

export interface FlowerReason {
  id: string;
  name: string;
  flowerType: 'rose' | 'daisy' | 'tulip' | 'wildflower';
  meaning: string;
  reason: string;
}

export const storyData = {
  herName: 'Neha',
  hisName: 'Kshitij',
  date: 'November 24',
  tagline: 'designed slowly · kept in secret · dedicated to you',

  gate: {
    label: 'Issue No. 24 · Private Archive',
    headline: 'For',
    subheadline: 'The muse who turned my chaos into modern poetry.',
    prompt: 'Tap or hold the seal to unlock our story',
    footnote: 'A cinematic journey in seven chapters',
  },

  bookSection: {
    label: 'Chapter 01 · The Keepsake',
    title: 'Curated in Whispers',
    subtitle: 'Tap the book cover to reveal what’s hidden inside.',
    year: 'Unapologetic & Everlasting',
    coverTitle: 'NEHA',
    previewPhoto: img('intro.jpg'),
    microcopy: 'you are the art and the architecture',
  },

  poemSection: {
    label: 'Chapter 02 · The Frequency',
    title: 'Unspoken Gravity',
    backgroundWords: ['ELECTRIC', 'DEVOTION', 'SANCTUARY', 'ETERNITY'],
    text: 'I have never loved anyone before you, Neha, and I have zero desire to ever look beyond you. You are the fire in my chest and the calm in my ribs. Beyond reason, beyond time, you are my sweetest obsession, my favorite collision, and the only soul I will choose in every lifetime.',
    microcopy: 'breathe it in · read between the lines',
  },

  memoriesSection: {
    label: 'Chapter 03 · The Gallery',
    title: 'Frames of Intimacy',
    subtitle: 'Golden hour shadows, soft glances, and moments that stopped the clock. Tap any frame to expand.',
    photos: [
      {
        src: img('memory-01.jpg'),
        alt: 'In a green dress on a lawn under tall trees',
        caption: '01 / Untamed Silhouette',
        poeticNote: 'Green silk against the wind. The moment nature realized it had met its match.',
        rotation: -2.5,
      },
      {
        src: img('memory-02.jpg'),
        alt: 'Smiling with a fan against a stone wall',
        caption: '02 / Sunlit Electricity',
        poeticNote: 'That reckless, incandescent smile that makes every room surrender.',
        rotation: 3,
      },
      {
        src: img('memory-03.jpg'),
        alt: 'Standing in a misty green landscape beside a tree',
        caption: '03 / Quiet Sanctuary',
        poeticNote: 'Wrapped in mist and mystery. The only world I ever want to get lost in.',
        rotation: -1.8,
      },
      {
        src: img('memory-04.jpg'),
        alt: 'Walking along a tree-lined path',
        caption: '04 / Parallel Horizons',
        poeticNote: 'Every step beside you feels like stepping straight into our own private cinematic universe.',
        rotation: 2.2,
      },
      {
        src: img('memory-06.jpg'),
        alt: 'Mirror selfie in a red sweater',
        caption: '05 / Velvet & Heat',
        poeticNote: 'Crimson warmth and casual perfection. You make effortless look like high fashion.',
        rotation: -3,
      },
    ] as MemoryPhoto[],
    microcopy: 'captured on 35mm film of the mind',
  },

  gardenSection: {
    label: 'Chapter 04 · The Botanicals',
    title: 'Four Shades of Devotion',
    subtitle: 'Tap each bloom to reveal the unspoken magnetism.',
    flowers: [
      {
        id: 'rose',
        name: 'The Crimson Rose',
        flowerType: 'rose',
        meaning: 'Visceral Devotion',
        reason:
          'Because you aren’t just a gentle wave—you’re the entire midnight tide pulling me under, and I never want to surface again.',
      },
      {
        id: 'daisy',
        name: 'The Sunlit Bloom',
        flowerType: 'daisy',
        meaning: 'Electric Euphoria',
        reason:
          'Because that raw, radiant energy of yours turns the heaviest days into effortless music. You are pure, untamed light.',
      },
      {
        id: 'tulip',
        name: 'The Velvet Tulip',
        flowerType: 'tulip',
        meaning: 'Cosmic Alignment',
        reason:
          'Because our frequencies locked together before we even had words for what we were. You feel like destiny with a pulse.',
      },
      {
        id: 'wildflower',
        name: 'The Wild Orchid',
        flowerType: 'wildflower',
        meaning: 'Intoxicating Grace',
        reason:
          'Because you are soft yet dangerous, fierce yet gentle. You bloom with a quiet confidence that completely disarms me.',
      },
    ] as FlowerReason[],
    microcopy: 'delicate petals · relentless devotion',
  },

  letterSection: {
    label: 'Chapter 05 · The Monologue',
    title: 'Inked in the Dark',
    subtitle: 'Tap the wax seal to unfold the handwritten parchment.',
    greeting: 'My sweet, intoxicating Neha,',
    paragraphs: [
      'I don’t believe in half-hearted loves or lukewarm promises. With you, everything is full volume, electric, and breathtakingly real.',
      'I love you beyond words, beyond logic, beyond anything this world could ever rationalize. You are not just someone I love—you are the rhythm beneath my ribs, my favorite conversation, my wildest dream, and the calmest shore I’ve ever touched.',
      'I never loved anyone before you, and no one will ever exist after you. You are the only one who holds the key to every room inside my soul. Even if lifetimes reset, I would cross every constellation to find you and make you mine all over again.',
      'Thank you for existing, for being your fiercely radiant, gorgeous, magnetic self. Loving you is the easiest and most exhilarating thing I have ever done.',
    ],
    signoff: 'Completely & irrevocably yours,',
    signature: 'Kshitij 🫶🏻',
  },

  cakeSection: {
    label: 'Chapter 06 · The Midnight Wish',
    headline: ['Happy Birthday,', 'Neha'],
    message:
      'To the girl who carries stardust in her eyes and fire in her soul. May this year be as magnetic, luxurious, and beautiful as you are.',
    closing: '— Forever entangled with you, Kshitij 🫶🏻',
    blowInstruction: 'Blow into your microphone or tap the flame to make a wish ✨',
    photo: img('finale.jpg'),
  },
};
