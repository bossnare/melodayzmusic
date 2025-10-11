import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useState } from 'react';
import { Dialog, DialogOverlay } from '../ui/dialog';
import { Button } from '@/components/ui/button';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { AuthCtaButton } from './AuthCtaButton';

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot className="text-xl p-7 lg:p-6 lg:text-lg" index={0} />
        <InputOTPSlot className="text-xl p-7 lg:p-6 lg:text-lg" index={1} />
        <InputOTPSlot className="text-xl p-7 lg:p-6 lg:text-lg" index={2} />
        <InputOTPSlot className="text-xl p-7 lg:p-6 lg:text-lg" index={3} />
        <InputOTPSlot className="text-xl p-7 lg:p-6 lg:text-lg" index={4} />
        <InputOTPSlot className="text-xl p-7 lg:p-6 lg:text-lg" index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function OtpOverlay() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open}>
      <DialogOverlay className="flex justify-center py-8 bg-background">
        <div className="flex flex-col items-center w-[90%] md:w-[40%] space-y-6">
          <h2 className="text-xl font-bold">Jereo ny mailaka</h2>
          <p className="text-center text-muted-foreground">
            Nandefa kaody OTP izahay any amin&apos;ny mailaka nao{' '}
            <span>christogervais@gmail.com</span>{' '}
          </p>
          <InputOTPPattern />
          <AuthCtaButton size="xl" className="w-full md:w-[50%]">
            Alefaso
          </AuthCtaButton>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-1">
            <span>Mbola tsy nahavoaray kaody ve?</span>
            <Button variant="link" className="h-auto p-0 text-ring">
              Alefaso indray
            </Button>{' '}
          </div>
        </div>
      </DialogOverlay>
    </Dialog>
  );
}

export { OtpOverlay };
