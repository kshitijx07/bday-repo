import type { Page } from '../data/storyContent';
import Photo from './Photo';
import MemoryGallery from './MemoryGallery';
import LoveLetter from './LoveLetter';
import BirthdayFinale from './BirthdayFinale';
import Heart from './Heart';

const pad = (n: number) => String(n).padStart(2, '0');
const Num = ({ n, total }: { n: number; total: number }) => (
  <span className="font-serif text-4xl sm:text-5xl md:text-8xl font-light leading-none text-sky/20">
    {pad(n)}
    <span className="text-xl sm:text-2xl md:text-3xl text-blush">/{pad(total)}</span>
  </span>
);

export default function BookPage({ page, n, total, onRestart }: { page: Page; n: number; total: number; onRestart: () => void }) {
  if (page.kind === 'memories') return <MemoryGallery page={page} />;
  if (page.kind === 'letter') return <LoveLetter page={page} />;
  if (page.kind === 'finale') return <BirthdayFinale page={page} onRestart={onRestart} />;

  const flip = page.kind === 'special';
  return (
    <div
      className={`grid h-full grid-cols-1 overflow-y-auto overscroll-contain md:grid-rows-[minmax(0,1fr)] md:overflow-hidden ${
        flip ? 'md:grid-cols-[1fr_auto]' : 'md:grid-cols-[auto_1fr]'
      }`}
    >
      <div className={`flex items-center justify-center p-3 sm:p-5 md:h-full md:p-8 shrink-0 ${flip ? 'md:order-2' : ''}`}>
        <div className="w-full flex justify-center md:h-full">
          <Photo photo={page.photo} eager />
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-3 sm:gap-6 p-4 sm:p-6 md:p-10">
        <div className="flex items-start justify-between">
          <p className="label flex items-center gap-1.5 text-sky/60 text-[0.62rem] sm:text-xs">
            <Heart size={8} /> {page.label}
          </p>
          <Num n={n} total={total} />
        </div>

        <div className="space-y-3 sm:space-y-5 my-auto py-1">
          <h2 className="font-serif text-[clamp(1.75rem,5vw,4.2rem)] font-light leading-[1.08] text-sky">
            {page.title}
          </h2>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed sm:leading-7 text-sky/80">
            {page.body}
          </p>
          {page.kind === 'special' && (
            <ol className="mt-3 sm:mt-6 max-w-md space-y-1">
              {page.points.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 sm:gap-4 border-t border-blush/25 py-2.5 sm:py-3.5 text-xs sm:text-sm leading-snug sm:leading-6 text-sky"
                >
                  <span className="label pt-0.5 text-blush font-semibold">{pad(i + 1)}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <p className="label border-t border-blush/25 pt-2.5 sm:pt-4 text-sky/60 text-[0.58rem] sm:text-xs">
          {page.photo.caption}
        </p>
      </div>
    </div>
  );
}
