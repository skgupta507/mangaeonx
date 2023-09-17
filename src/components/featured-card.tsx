import Link from 'next/link';
import type { Featured } from '@/types/featured';

interface FeaturedCardProps {
  item: Featured;
}

export const FeaturedCard = ({ item }: FeaturedCardProps) => {
  const link = `/ler/${item.chapter.id_release}`;

  return (
    <li
      className='snap-center relative h-full w-full shrink-0 text-slate-100 overflow-hidden'
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
        backgroundColor: `#${item.hex_color || 'acacac'}`,
      }}
    >
      <Link
        href={link}
        className='min-w-fit select-text focus:outline outline-1 outline-indigo-600 -outline-offset-1'
      >
        <img
          className='h-full w-full object-contain object-bottom'
          src={item.featured_image}
          alt={item.series_name}
        />
      </Link>
      <div className='absolute top-0 flex flex-col px-6 py-4 pointer-events-none'>
        <Link className='font-bold text-xl hover:underline' href={link}>
          {item.series_name}
        </Link>
        <span className='text-sm'>Capítulo {item.chapter.number}</span>
        <span className='text-sm'>{item.chapter.day}</span>
      </div>
    </li>
  );
};