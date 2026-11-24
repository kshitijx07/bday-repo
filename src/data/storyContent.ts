/* ===========================================================
   POETIC STORY CONTENT — NEHA & KSHITIJ
   Aesthetic Minimal Poetry & Interactive Journey
   =========================================================== */

const img = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

export interface MemoryPhoto {
  src: string;
  alt: string;
  caption: string;
  poeticNote: string;
  date?: string;
  ratio: string;
}

export interface TruthCard {
  id: string;
  number: string;
  subtitle: string;
  title: string;
  excerpt: string;
  poeticProse: string[];
}

export const storyData = {
  herName: 'Neha',
  hisName: 'Kshitij',
  couple: 'Neha & Kshitij',
  subheading: 'A poem written in the language of two souls.',

  prologue: {
    tagline: 'To the one who made eternity feel too short',
    title: 'Across Every Lifetime',
    subtitle: 'A love story dedicated to Neha, by Kshitij.',
    quote: '“My soul recognized yours before my heart had learned to beat for anyone else.”',
    coordinates: 'Written in the stars · Kept in my heart',
    scrollHint: 'Scroll gently to begin',
  },

  chapter1: {
    number: 'Chapter I',
    label: 'The Recognition',
    headline: 'Before Words, There Was You',
    verses: [
      'Before physical logic, before promises or paper,',
      'my soul had already accepted you as its home.',
      'I have never loved anyone before you, Neha,',
      'and in this vast, quiet universe,',
      'I don’t ever want to love anyone after.',
    ],
    reflection:
      'For me, there is no one beyond you. No one who could ever take your place, no one who could soften the world the way you do with a single breath.',
    photo: {
      src: img('intro.jpg'),
      alt: 'Neha with candles and ribbons',
      caption: 'The warmth that illuminates all my shadows.',
      ratio: '1158 / 1500',
    },
  },

  chapter2: {
    number: 'Chapter II',
    label: 'The Three Truths',
    headline: 'Three Sacred Truths of You',
    description: 'Tap each card to read what my soul whispers about you when the world goes quiet.',
    truths: [
      {
        id: 'truth-1',
        number: '01',
        subtitle: 'The Light You Carry',
        title: 'The Solace in Your Smile',
        excerpt: 'When the world is heavy, your laughter creates peace out of chaos.',
        poeticProse: [
          'You carry a tenderness so rare that simply watching you moves something ancient in my chest.',
          'Your smile isn’t just beautiful, Neha—it is a sanctuary. It turns the sharpest days gentle, and makes every burden feel like mist in the morning sun.',
          'If I were granted only one view for the rest of my days, it would be the quiet curve of your lips when you are truly happy.',
        ],
      },
      {
        id: 'truth-2',
        number: '02',
        subtitle: 'The Chosen One',
        title: 'My Heart’s Final Destination',
        excerpt: 'I never loved anyone before you, and there is no one beyond you.',
        poeticProse: [
          'People speak of finding love as if it were a search, but finding you felt like returning to a room I had known before I was born.',
          'You are the only one my heart chose, the one my soul recognizes without hesitation, and the only companion I want in every iteration of this life.',
          'There is no one beyond you, Neha. You are the beginning, the center, and the quiet horizon of my world.',
        ],
      },
      {
        id: 'truth-3',
        number: '03',
        subtitle: 'Beyond Eternity',
        title: 'The Promise Across Lifetimes',
        excerpt: 'Even if death separates us, I will find my way back to your side.',
        poeticProse: [
          'Even if time fades and this fleeting life comes to its quiet end, my spirit will still remember the melody of yours.',
          'Somewhere, somehow, through whatever darkness lies between lifetimes, I would choose you again. I would search through a thousand skies just to find your eyes again.',
          'Forever doesn’t feel long enough for what I feel for you. You are, and always will be, my love.',
        ],
      },
    ] as TruthCard[],
    photo: {
      src: img('special.jpg'),
      alt: 'Neha in soft sunlight',
      caption: 'Grace in human form.',
      ratio: '3 / 4',
    },
  },

  chapter3: {
    number: 'Chapter III',
    label: 'The Archive',
    headline: 'Moments Suspended in Light',
    subtext: 'Every photograph is a prayer that time would stand still.',
    photos: [
      {
        src: img('memory-01.jpg'),
        alt: 'In a green dress on a lawn under tall trees',
        caption: 'Under the green canopy',
        poeticNote: 'Where quiet afternoons whispered of forever, and ordinary time ceased to exist.',
        ratio: '3 / 4',
      },
      {
        src: img('memory-02.jpg'),
        alt: 'Smiling with a fan against a stone wall',
        caption: 'Sunlit Radiance',
        poeticNote: 'The sunlight only borrowed its brightness from that smile of yours.',
        ratio: '3 / 4',
      },
      {
        src: img('memory-03.jpg'),
        alt: 'Standing in a misty green landscape beside a tree',
        caption: 'Lost in the Mist',
        poeticNote: 'Wherever you stand, the world becomes a sanctuary. Even the mist feels holy.',
        ratio: '3 / 4',
      },
      {
        src: img('memory-04.jpg'),
        alt: 'Walking along a tree-lined path',
        caption: 'The Path Beside You',
        poeticNote: 'I would walk any road on earth, as long as it leads alongside your steps.',
        ratio: '3 / 4',
      },

      {
        src: img('memory-06.jpg'),
        alt: 'Selfie in red sweater',
        caption: 'Warmth in Winter',
        poeticNote: 'The only warmth I will ever need when the cold winds blow.',
        ratio: '845 / 1500',
      },
    ] as MemoryPhoto[],
  },

  chapter4: {
    number: 'Chapter IV',
    label: 'The Unspoken Letter',
    headline: 'From Kshitij’s Heart to Yours',
    instruction: 'Tap the wax seal to open this letter.',
    greeting: 'My dearest Neha,',
    paragraphs: [
      'I love you beyond anything, beyond words, beyond everything this world could ever explain. My soul has already accepted you as its partner, and every heartbeat of mine belongs to you. Beyond physical logic, beyond any paper, promise, or validation, you are my companion, my love, my home, and my whole world.',
      'I have never loved anyone before you, and I don’t ever want to love anyone after you. For me, there is no one beyond you, no one who could ever take your place. You are the one my heart chose, the one my soul recognizes, and the one I want to love in every lifetime.',
      'And even if death separates us in this life, I hope that somewhere, somehow, I find my way back to you in the next one. I would choose you again, love you again, and find you again, no matter how many lifetimes it takes.',
      'You are, and always will be, my love. Forever doesn’t feel long enough for what I feel for you.',
    ],
    signoff: 'Forever and in every lifetime,',
    signature: 'Yours, Kshitij ❤️🫶🏻',
  },

  chapter5: {
    number: 'Chapter V',
    label: 'Soul Resonance',
    headline: 'Touch the Constellation',
    prompt: 'Tap or drag across the night sky to draw glowing constellations between our souls.',
    subtext: 'Every touch weaves another thread binding Kshitij & Neha across eternity.',
  },

  chapter6: {
    number: 'Epilogue',
    label: 'Birthday Wish',
    headline: ['Happy Birthday,', 'My Whole World.'],
    blessing:
      'May this year treat your heart with the same gentleness, joy, and breathtaking love you have given to mine. Happy Birthday, Neha.',
    candleInstruction: 'Make a wish in your heart, then tap the candle to blow it out ✨',
    photo: {
      src: img('finale.jpg'),
      alt: 'Birthday celebration cake and candles',
      ratio: '3 / 4',
    },
    closing: '— With infinite love, Kshitij 🫶🏻',
  },
};
