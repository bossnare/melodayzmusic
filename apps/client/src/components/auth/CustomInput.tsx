'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  CircleCheckBig,
  OctagonAlert,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

const PasswordInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const toggleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className="py-6"
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        {...props}
      />
      {focused && (
        <span className="absolute -translate-y-1/2 right-1 lg:right-2 top-1/2">
          <MotionButton
            type="button"
            className="*:!size-5 p-3 lg:p-2 lg:*:!size-4"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleShow}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </MotionButton>
        </span>
      )}
    </div>
  );
};

type UsernameInputProps = {
  usernameVerified?: boolean;
  isPending?: boolean;
  validUsername?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UsernameInput = ({
  usernameVerified,
  isPending,
  ...props
}: UsernameInputProps) => {
  function renderingStatus() {
    if (isPending) {
      return (
        <span className="absolute -translate-y-1/2 right-2 lg:right-3 top-1/2 p-[2px] rounded-full">
          <Spinner className="size-[18px] text-foreground/50" />
        </span>
      );
    }

    if (usernameVerified) {
      return (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: -45,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.6,
            type: 'spring',
            stiffness: 200,
            mass: 0.5, // overshoot
            damping: 20,
          }}
          className="absolute -translate-y-1/2 right-2 lg:right-3 top-1/2 p-[2px] rounded-full text-white dark:text-foreground bg-chart-4"
        >
          <CircleCheckBig className="size-[18px]" />
        </motion.div>
      );
    } else {
      return (
        <span className="absolute -translate-y-1/2 right-2 lg:right-3 top-1/2 p-[2px] rounded-full text-destructive bg-destructive/20">
          <OctagonAlert className="size-[18px]" />
        </span>
      );
    }
  }

  return (
    <div className="relative">
      <Input
        placeholder="vibequeen848"
        type="text"
        className="py-6 pl-8"
        {...props}
      />
      <span className="absolute -translate-y-1/2 left-3 top-1/2 p-[2px] rounded-full">
        @
      </span>

      {renderingStatus()}
    </div>
  );
};

export { PasswordInput, UsernameInput };
