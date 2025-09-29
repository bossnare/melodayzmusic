import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

export function DialogCloseButton({
  title,
  description,
  close,
  open,
  onOpenChange,
  error = true,
}: {
  title: string;
  description: string;
  close: string;
  open: boolean;
  onOpenChange: () => void;
  error?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          key={'login-dialog'}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 50 }}
          className="space-y-4"
        >
          <DialogHeader>
            {error && (
              <AlertTriangle className="text-destructive mx-auto mb-2" />
            )}
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="font-montserrat"
                type="button"
                variant="secondary"
              >
                {close}
              </Button>
            </DialogClose>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
