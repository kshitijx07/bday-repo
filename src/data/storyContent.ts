/* ===========================================================
   STORY CONTENT — NEHA & KSHITIJ
   Personalized words, memory archive, garden reasons, and letter.
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
  tagline: 'scroll slowly, I made this for you',

  gate: {
    label: 'A Little Something For You',
    headline: 'For Neha,',
    subheadline: 'The girl who makes my entire world softer.',
    prompt: 'Press & hold the wax seal to enter',
    footnote: 'A story told across seven chapters',
  },

  bookSection: {
    label: 'Chapter 01 · The Keepsake',
    title: 'A Little Book Kept for You',
    subtitle: 'Tap the book or tilt your screen to open',
    year: 'Forever & Always',
    coverTitle: 'For Neha',
    previewPhoto: img('intro.jpg'),
    microcopy: 'every second with you feels like home',
  },

  poemSection: {
    label: 'Chapter 02 · The Vow',
    title: 'What My Soul Already Knows',
    backgroundWords: ['ETERNITY', 'DEVOTION', 'SANCTUARY', 'FOREVER'],
    text: 'I have never loved anyone before you, Neha, and I don’t ever want to love anyone after you. For me, there is no one beyond you, no one who could ever take your place. You are the one my heart chose, the one my soul recognizes, and the one I want to love in every lifetime.',
    microcopy: 'take your time, these words are yours',
  },

  memoriesSection: {
    label: 'Chapter 03 · The Archive',
    title: 'Small Moments, Kept Close',
    subtitle: 'Polaroids suspended in light. Tap any photograph to enlarge.',
    photos: [
      {
        src: img('memory-01.jpg'),
        alt: 'In a green dress on a lawn under tall trees',
        caption: 'Soft green afternoon',
        poeticNote: 'Where quiet afternoons whispered of forever, and time forgot to run.',
        rotation: -2.5,
      },
      {
        src: img('memory-02.jpg'),
        alt: 'Smiling with a fan against a stone wall',
        caption: 'Sunlit radiance',
        poeticNote: 'The sunlight only borrowed its brightness from that smile of yours.',
        rotation: 3,
      },
      {
        src: img('memory-03.jpg'),
        alt: 'Standing in a misty green landscape beside a tree',
        caption: 'Somewhere misty and quiet',
        poeticNote: 'Wherever you stand, the world becomes gentle. Even the mist feels holy.',
        rotation: -1.8,
      },
      {
        src: img('memory-04.jpg'),
        alt: 'Walking along a tree-lined path',
        caption: 'The road beside you',
        poeticNote: 'I would walk any road on earth, as long as it is alongside your hand.',
        rotation: 2.2,
      },
      {
        src: img('memory-06.jpg'),
        alt: 'Mirror selfie in a red sweater',
        caption: 'Warmth in winter',
        poeticNote: 'The only warmth I will ever seek when cold winds blow.',
        rotation: -3,
      },
    ] as MemoryPhoto[],
    microcopy: 'captured in time, kept in my heart',
  },

  gardenSection: {
    label: 'Chapter 04 · The Garden',
    title: 'Four Blooms for You',
    subtitle: 'Tap each flower to reveal what made my soul choose you.',
    flowers: [
      {
        id: 'rose',
        name: 'The Rose',
        flowerType: 'rose',
        meaning: 'Deepest Affection',
        reason:
          'Because your love is not fragile—it is steadfast, tender, and the only sanctuary where my heart feels completely safe.',
      },
      {
        id: 'daisy',
        name: 'The Daisy',
        flowerType: 'daisy',
        meaning: 'Pure Joy',
        reason:
          'Because of the effortless light you bring into every room. You can take the heaviest day and turn it gentle with just one smile.',
      },
      {
        id: 'tulip',
        name: 'The Tulip',
        flowerType: 'tulip',
        meaning: 'Perfect Harmony',
        reason:
          'Because beyond physical logic, beyond words or paper, our souls fit together like they were sculpted from the very same star.',
      },
      {
        id: 'wildflower',
        name: 'The Wildflower',
        flowerType: 'wildflower',
        meaning: 'Enduring Grace',
        reason:
          'Because you are so much braver and more magnificent than you ever give yourself credit for. You bloom even when the ground is stone.',
      },
    ] as FlowerReason[],
    microcopy: 'every petal holds a truth',
  },

  letterSection: {
    label: 'Chapter 05 · The Unspoken Letter',
    title: 'From My Heart to Yours',
    subtitle: 'Tap to break the wax seal and unfold the parchment.',
    greeting: 'My dearest Neha,',
    paragraphs: [
      'I am not always good at saying things out loud the way I mean them, so I wrote them down here.',
      'I love you beyond anything, beyond words, beyond everything this world could ever explain. My soul has already accepted you as its partner, and every heartbeat of mine belongs to you. Beyond physical logic, beyond any paper, promise, or validation, you are my companion, my love, my home, and my whole world.',
      'I have never loved anyone before you, and I don’t ever want to love anyone after you. For me, there is no one beyond you, no one who could ever take your place. You are the one my heart chose, the one my soul recognizes, and the one I want to love in every lifetime.',
      'And even if death separates us in this life, I hope that somewhere, somehow, I find my way back to you in the next one. I would choose you again, love you again, and find you again, no matter how many lifetimes it takes.',
      'You are, and always will be, my love. Forever doesn’t feel long enough for what I feel for you.',
    ],
    signoff: 'Always and in every lifetime,',
    signature: 'Yours, Kshitij ❤️🫶🏻',
  },

  cakeSection: {
    label: 'Chapter 06 · The Finale',
    headline: ['Happy Birthday,', 'Neha ❤️'],
    message:
      'I hope today is gentle and full of everything your beautiful heart loves. May this year feel the way you make other people feel.',
    closing: '— With infinite love, Kshitij 🫶🏻',
    blowInstruction: 'Blow into your phone microphone, or press & hold the candle flame to blow it out ✨',
    photo: img('finale.jpg'),
  },
};
