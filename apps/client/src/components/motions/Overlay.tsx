import { Spinner } from '@/components/ui/spinner';
import {cn} from '@/lib/utils'

export const Overlay = ({isPending}: {isPending?: boolean}) => {
  return (
     <div
          className={cn(
            'bg-black/50 z-60 fixed inset-0 flex items-center justify-center backdrop-blur-sm',
            isPending
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        >
          <Spinner className="size-10 text-white" />
        </div>
  )
}