/* ===========================================================
   EDIT THIS FILE ONLY. Everything personal lives here.
   =========================================================== */
const img = (f: string) => `${import.meta.env.BASE_URL}images/${f}`;

export type Photo = { src: string; alt: string; ratio: string; caption?: string };

export type Page =
  | { kind: 'intro'; label: string; title: string; body: string; photo: Photo }
  | { kind: 'special'; label: string; title: string; body: string; points: string[]; photo: Photo }
  | { kind: 'memories'; label: string; title: string; photos: Photo[] }
  | { kind: 'letter'; label: string; greeting: string; paragraphs: string[]; signoff: string; signature: string }
  | { kind: 'finale'; label: string; headline: [string, string]; message: string; closing: string; photo: Photo };

export const story = {
  herName: 'Nehaa',
  birthday: { display: 'With all my love ❤️' },
  opening: {
    label: 'A love letter in pages',
    headline: 'Nehaa, you are my whole world.',
    subtitle: 'Happy Birthday, my love ❤️',
    button: 'Open your surprise, beautiful ✨',
    footer: 'A story written with love',
  },
  cover: { label: 'Our love story', title: 'For Nehaa ❤️', year: 'Forever & Always' },
  pages: [
    {
      kind: 'intro',
      label: 'Chapter 01 — My Heart',
      title: 'Happy Birthday, Nehaa ❤️',
      body: 'I made this little world just for you, because a simple card could never hold everything I feel. Every pixel here carries a piece of my heart. Take your time, beautiful — this is all yours.',
      photo: { src: img('intro.jpg'), alt: 'Birthday portrait', ratio: '1158 / 1500', caption: 'The moment I knew you were everything ❤️' },
    },
    {
      kind: 'special',
      label: 'Chapter 02 — What I Love',
      title: 'Everything about you.',
      body: 'If I could only keep three things about you in my memory forever, it would be these:',
      points: [
        'The way your eyes light up when you smile — it makes the whole world stop for a moment.',
        'How you love people so deeply and gently, like it\'s the most natural thing in the world.',
        'Your strength — you are so much braver and more beautiful than you will ever believe.',
      ],
      photo: { src: img('special.jpg'), alt: 'Special moment', ratio: '3 / 4', caption: 'You make ordinary moments magical ✨' },
    },
    {
      kind: 'memories',
      label: 'Chapter 03 — Our Moments',
      title: 'Moments I keep close to my heart.',
      photos: [
        { src: img('memory-01.jpg'), alt: 'Together in nature', ratio: '3 / 4', caption: 'Every moment with you feels like a dream 💚' },
        { src: img('memory-02.jpg'), alt: 'Smiling together', ratio: '3 / 4', caption: 'Your smile is my favourite thing in this world 🌸' },
        { src: img('memory-03.jpg'), alt: 'In a beautiful place', ratio: '3 / 4', caption: 'Everywhere is beautiful when you are there 🌿' },
        { src: img('memory-04.jpg'), alt: 'Walking together', ratio: '3 / 4', caption: 'I would walk any path as long as it is with you 🤍' },
        { src: img('memory-05.jpg'), alt: 'A quiet moment', ratio: '3 / 4', caption: 'Peace is wherever you are 🪷' },
        { src: img('memory-06.jpg'), alt: 'A beautiful selfie', ratio: '845 / 1500', caption: 'The most beautiful soul I have ever known 💗' },
      ],
    },
    {
      kind: 'letter',
      label: 'Chapter 04 — My Letter To You',
      greeting: 'My dearest Nehaa,',
      paragraphs: [
        'I am not always good at saying things out loud the way I mean them, so I wrote them down here, in a place where my heart can speak freely.',
        'I love you beyond anything, beyond words, beyond everything this world could ever explain. My soul has already accepted you as its partner, and every heartbeat of mine belongs to you.',
        'I have never loved anyone before you, and I don\'t ever want to love anyone after you. For me, there is no one beyond you, no one who could ever take your place. You are the one my heart chose, the one my soul recognizes, and the one I want to love in every lifetime.',
        'And even if death separates us in this life, I hope that somewhere, somehow, I find my way back to you in the next one. I would choose you again, love you again, and find you again, no matter how many lifetimes it takes.',
        'You are, and always will be, my love. Forever doesn\'t feel long enough for what I feel for you. ❤️🫶🏻',
      ],
      signoff: 'Forever yours,',
      signature: 'Your Love ❤️',
    },
    {
      kind: 'finale',
      label: 'Chapter 05 — Forever',
      headline: ['Happy Birthday,', 'Nehaa ❤️'],
      message: 'Beyond physical logic, beyond any paper, promise, or validation — you are my companion, my love, my home, and my whole world. May this year bring you everything your beautiful heart deserves.',
      closing: '— With all my love, forever and always 🫶🏻',
      photo: { src: img('finale.jpg'), alt: 'Birthday celebration', ratio: '3 / 4' },
    },
  ] as Page[],
};
