'use client';
import { Spinner } from '@/components/ui/spinner';

export default function CongratulationPage() {
  return (
    <div className="h-dvh w-full flex items-center flex-col justify-center">
      <h3 className="font-poppins font-bold text-3xl">C&apos;est fini !</h3>
      <p>Congratulations ❇️🫂</p>
      <span className="mt-5 flex gap-2">
        <Spinner className="size-6" /> Attends...
      </span>
    </div>
  );
}
