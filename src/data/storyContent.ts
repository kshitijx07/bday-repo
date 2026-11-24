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
  tagline: 'a birthday keepsake · designed slowly · dedicated to Neha',

  gate: {
    headline: 'Happy Birthday,',
    subheadline: 'To the girl whose presence turns ordinary days into poetry. May this new year bring you everything your radiant soul deserves.',
    prompt: 'Tap or hold the wax seal to unwrap your birthday story',
    footnote: 'A birthday celebration in seven cinematic chapters',
  },

  bookSection: {
    label: 'Chapter 01 · The Birthday Keepsake',
    title: 'A Chapter for Your Day',
    subtitle: 'Tap the book cover to unwrap a private birthday surprise.',
    year: 'Celebrating Neha · November 24',
    coverTitle: 'NEHA',
    previewPhoto: img('intro.jpg'),
    microcopy: 'happy birthday to the girl who is both the art and the architecture',
  },

  poemSection: {
    label: 'Chapter 02 · The Birthday Vow',
    title: 'The Day the Stars Aligned',
    backgroundWords: ['CELEBRATE', 'DEVOTION', 'SANCTUARY', 'ETERNITY'],
    text: 'On this day, the universe gifted the world its rarest light, and gifted me my home. Happy Birthday, Neha. I have never loved anyone before you, and I have zero desire to ever look beyond you. You are the fire in my chest, the calm in my ribs, and the reason my world is full of color. I celebrate your birth today, tomorrow, and across every lifetime.',
    microcopy: 'breathe it in · a birthday wish etched in stars',
  },

  memoriesSection: {
    label: 'Chapter 03 · The Birthday Retrospective',
    title: 'Another Year of Your Radiance',
    subtitle: 'Moments capturing the grace, the wild laughter, and the incandescent soul that makes you unforgettable. Tap any frame to expand.',
    photos: [
      {
        src: img('memory-01.jpg'),
        alt: 'In a green dress on a lawn under tall trees',
        caption: '01 / Untamed Grace',
        poeticNote: 'Happy Birthday to the girl whose grace silences the noise. Green silk against the wind, effortlessly captivating.',
        rotation: -2.5,
      },
      {
        src: img('memory-02.jpg'),
        alt: 'Smiling with a fan against a stone wall',
        caption: '02 / Sunlit Laughter',
        poeticNote: 'Wishing you a year as bright as this smile. That reckless, incandescent joy that makes every room surrender.',
        rotation: 3,
      },
      {
        src: img('memory-03.jpg'),
        alt: 'Standing in a misty green landscape beside a tree',
        caption: '03 / Quiet Sanctuary',
        poeticNote: 'In a misty world, you remain my calmest truth. Celebrating your gentle depth and beautiful mind.',
        rotation: -1.8,
      },
      {
        src: img('memory-04.jpg'),
        alt: 'Walking along a tree-lined path',
        caption: '04 / Beautiful Horizons',
        poeticNote: 'Here’s to every new adventure this year brings. Walking beside you is my favorite place in the universe.',
        rotation: 2.2,
      },
      {
        src: img('memory-06.jpg'),
        alt: 'Mirror selfie in a red sweater',
        caption: '05 / Velvet & Radiance',
        poeticNote: 'Crimson warmth and timeless elegance. May your new year be as bold, magnetic, and unforgettable as you.',
        rotation: -3,
      },
    ] as MemoryPhoto[],
    microcopy: 'celebrating every chapter and every version of you',
  },

  gardenSection: {
    label: 'Chapter 04 · Birthday Blooms',
    title: 'Four Wishes for Your New Year',
    subtitle: 'Tap each bloom to reveal a birthday wish and a reason my heart celebrates your existence.',
    flowers: [
      {
        id: 'rose',
        name: 'The Crimson Rose',
        flowerType: 'rose',
        meaning: 'Wish of Fierce Peace',
        reason:
          'Happy Birthday, Neha. May your new year be wrapped in fierce peace and unwavering passion. You aren’t just a gentle wave—you are the midnight tide pulling me under, and loving you is the greatest gift of my life.',
      },
      {
        id: 'daisy',
        name: 'The Sunlit Bloom',
        flowerType: 'daisy',
        meaning: 'Wish of Pure Joy',
        reason:
          'May your laughter never lose its untamed sparkle. Your radiant energy turns the heaviest days into effortless music, and I celebrate the sunshine you bring to everyone around you.',
      },
      {
        id: 'tulip',
        name: 'The Velvet Tulip',
        flowerType: 'tulip',
        meaning: 'Wish of Cosmic Magic',
        reason:
          'May every dream you whisper into the dark come true this year. Our frequencies locked like we were carved from the same star, and watching your dreams unfold is my greatest joy.',
      },
      {
        id: 'wildflower',
        name: 'The Wild Orchid',
        flowerType: 'wildflower',
        meaning: 'Wish of Fearless Growth',
        reason:
          'May you always know how magnificent and resilient you are. You bloom with quiet confidence and fearless grace that completely disarms me. Happy Birthday, my love.',
      },
    ] as FlowerReason[],
    microcopy: 'four blooms · four birthday wishes from Kshitij',
  },

  letterSection: {
    label: 'Chapter 05 · The Birthday Letter',
    title: 'To the Birthday Girl',
    subtitle: 'Tap the wax seal to unfold Kshitij’s handwritten birthday letter.',
    greeting: 'Happy Birthday, my sweetest Neha,',
    paragraphs: [
      'Today the universe celebrates the day you were born, and my entire heart joins in. Happy Birthday, Neha. When I look back at my life before you, it feels like black-and-white static—and then you arrived, turning everything into full volume, vivid color, and breathtaking poetry.',
      'I want you to know how deeply, completely, and endlessly you are loved. You are not just the girl of my dreams—you are the rhythm beneath my ribs, my favorite conversation at 2 AM, and the calmest shore my chaotic mind has ever known.',
      'I never loved anyone before you, and no one will ever compare to you. On this birthday, I promise to stand by your side through every dream you chase, every high, and every quiet moment in between. You have given me a sanctuary in your arms, and I will spend every tomorrow making sure you feel cherished.',
      'May this new year bring you everything your radiant heart desires: unstoppable confidence, deep happiness, and wild laughter. Thank you for being born, for choosing me, and for being the most magnetic soul in the universe.',
    ],
    signoff: 'Happy Birthday with all my love & devotion,',
    signature: 'Yours always, Kshitij 🫶🏻',
  },

  cakeSection: {
    label: 'Chapter 06 · The Birthday Wish',
    headline: ['Happy Birthday,', 'Neha'],
    message:
      'To the girl who carries stardust in her eyes and fire in her soul. Close your eyes, make a secret wish, and blow out your candle. May your new year be as luminous and unforgettable as you are.',
    closing: '— Forever celebrating you, Kshitij 🫶🏻',
    blowInstruction: 'Blow into your microphone or tap the flame to make your birthday wish ✨',
    photo: img('finale.jpg'),
  },
};
