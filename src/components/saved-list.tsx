'use client';

import { useEffect, useMemo, useState } from 'react';
import { SecondaryAlert } from './alert';
import { useOfflineApi } from './offline-api-context';
import { SavedChapter } from '@/types/saved-chapter';
import { ArrowRight } from 'lucide-react';
import { OfflineChaptersDialog } from './offline-chapters-dialog';

export const SavedList = () => {
  const offlineApi = useOfflineApi();
  const [chapterList, setChapterList] = useState<SavedChapter[]>([]);
  const [onLoading, setLoading] = useState(true);

  useEffect(() => {
    offlineApi
      .getChapters()
      .then(setChapterList)
      .finally(() => setLoading(false));
  }, [offlineApi]);

  const groupedBy = useMemo(
    () =>
      chapterList.reduce(
        (prev, curr) => (
          prev.find((x) => x.mangaId === curr.mangaId)?.chapters.push(curr) !==
            undefined || prev.push({ mangaId: curr.mangaId, chapters: [curr] }),
          prev
        ),
        [] as { mangaId: number; chapters: SavedChapter[] }[]
      ),
    [chapterList]
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [targetChapters, setTargetChapters] = useState<SavedChapter[]>();

  const handleOpenModal = (idx: number) => {
    setOpenDialog(true);
    setTargetChapters(groupedBy[idx].chapters);
  };

  if (onLoading) return 'Loading...';

  return (
    <>
      {chapterList.length === 0 && (
        <SecondaryAlert text='Nenhuma obra foi salva ainda.' />
      )}
      <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
        {groupedBy.map((chapters, idx) => (
          <li key={chapters.mangaId} className='py-3 sm:py-4'>
            <div className='flex items-center space-x-4'>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
                  {chapters.chapters[0].name}
                </p>
                <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
                  {chapters.chapters.length} capítulos salvos
                </p>
              </div>
              <button
                onClick={() => handleOpenModal(idx)}
                aria-label={`Ver capítulos do mangá ${chapters.chapters[0].name}`}
                className='w-8 h-8 inline-flex items-center justify-center text-base text-gray-900 rounded-full hover:bg-light-b focus:outline-none focus:ring-2 focus:ring-light-b dark:text-gray-400 dark:hover:bg-dark-b dark:focus:ring-dark-b'
              >
                <ArrowRight className='w-6 h-6' />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <OfflineChaptersDialog
        chapterList={targetChapters || []}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </>
  );
};