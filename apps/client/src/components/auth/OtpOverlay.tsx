'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useState, useEffect } from 'react';
import { Dialog, DialogOverlay } from '../ui/dialog';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { AuthCtaButton } from './AuthCtaButton';
import { MelodayzMusic } from '../branding/logo';
import { Tagline } from '../branding/tagline';
import { Spinner } from '@/components/ui/spinner';
import api from '@/libs/api';

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot className="text-xl p-6" index={0} />
        <InputOTPSlot className="text-xl p-6" index={1} />
        <InputOTPSlot className="text-xl p-6" index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot className="text-xl p-6" index={3} />
        <InputOTPSlot className="text-xl p-6" index={4} />
        <InputOTPSlot className="text-xl p-6" index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function OtpOverlay() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState('');
  const ignore_otp = sessionStorage.getItem('ignore_otp');

  useEffect(() => {
    const handleCheckAccount = async () => {
      try {
        const res = await api.get('/auth/me/verify');
        setIsVerified(Boolean(res.data.verified));
        setEmail(res.data.email);
      } catch (e) {
        console.error(e);
      }
    };

    handleCheckAccount();
  }, []);

  const handleGenerateOtp = async () => {
    try {
      const res = await api.post('/auth/send-otp', { email });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIgnore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setOpen(false);
      setIsLoading(false);
      sessionStorage.setItem('ignore_otp', 'true');
    }, 1000);
  };

  useEffect(() => {
    if (isVerified && ignore_otp) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isVerified, ignore_otp]);

  return (
    <Dialog open={open}>
      <DialogOverlay className="flex flex-col items-center px-4 py-2 bg-background md:overflow-y-scroll md:h-auto lg:overflow-hidden">
        <div className="flex justify-center md:justify-start w-full">
          <MelodayzMusic />
        </div>
        <div className="flex flex-col items-center w-[90%] md:w-[40%] space-y-6">
          <h2 className="pt-8 md:pt-4 text-xl font-bold">
            Vérification du code
          </h2>
          <p className="text-center text-muted-foreground">
            Pour confirmer que cette adresse t&apos;appartient, nous
            t&apos;avons envoyé un code à 6 chiffres à ton adresse e-mail{' '}
            <span className="text-foreground/90 md:text-sm tracking-wide">
              {email === '' ? <div className="animate-spin h-6 w-50 bg-muted rounded"></div> : email}
            </span>{' '}
          </p>
          <InputOTPPattern />
          <div className="w-full md:w-[50%] text-center space-y-3">
            <AuthCtaButton size="xl" className="w-full">
              Vérifier
            </AuthCtaButton>
            <Button
              onClick={handleIgnore}
              variant="ghost"
              className="h-auto p-0 hover:text-inherit text-muted-foreground"
            >
              {isLoading && <Spinner className="size-4" />} Ignorer pour
              l&apos;instant
            </Button>{' '}
          </div>
          <div className="flex flex-col items-center gap-2 text-sm md:flex-row md:gap-1">
            <span>Pas encore reçu ?</span>
            <Button
              disabled={email === ''}
              onClick={handleGenerateOtp}
              variant="link"
              className="h-auto p-0 text-ring"
            >
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
