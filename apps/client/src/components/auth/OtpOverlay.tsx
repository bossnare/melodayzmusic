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
import { MelodayzMusic } from '../branding/logo';
import { Tagline } from '../branding/tagline';

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot className="text-xl p-7" index={0} />
        <InputOTPSlot className="text-xl p-7" index={1} />
        <InputOTPSlot className="text-xl p-7" index={2} />
        <InputOTPSlot className="text-xl p-7" index={3} />
        <InputOTPSlot className="text-xl p-7" index={4} />
        <InputOTPSlot className="text-xl p-7" index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function OtpOverlay() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open}>
      <DialogOverlay className="flex flex-col items-center py-4 bg-background">
        <div className="flex flex-col items-center w-[90%] md:w-[40%] space-y-6">
          <MelodayzMusic />
          <h2 className="pt-8 text-xl font-bold">Vérification du code</h2>
          <p className="text-center text-muted-foreground">
            Un code à 6 chiffres vient d&apos;etre envoyé à ton adresse e-mail{' '}
            <span className="text-ring/80">christogervais@gmail.com</span>{' '}
          </p>
          <InputOTPPattern />
          <div className="w-full md:w-[50%] text-center space-y-3">
            <AuthCtaButton size="xl" className="w-full">
              Vérifier
            </AuthCtaButton>
            <Button
              variant="ghost"
              className="h-auto p-0 hover:text-inherit text-muted-foreground"
            >
              Ignorer pour l&apos;instant
            </Button>{' '}
          </div>
          <div className="flex flex-col items-center gap-3 text-sm md:flex-row md:gap-1">
            <span>Pas encore reçu ?</span>
            <Button variant="link" className="h-auto p-0 text-ring">
              Renvoyer le code
            </Button>{' '}
          </div>
        </div>

        <div className="absolute bottom-4">
          <Tagline showMore={false} />
        </div>
      </DialogOverlay>
    </Dialog>
  );
}

export { OtpOverlay };
