'use client';

import { AlertEmpty } from '@/components/alert/alert';

export default function DiscoverPage() {
  return (
    <div className="flex flex-col items-center justify-center w-2/3 gap-4 mx-auto mt-10 text-center sm:w-auto text-muted-foreground">
      <AlertEmpty />
    </div>
  );
}
