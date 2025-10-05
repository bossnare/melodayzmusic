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

// 🔒 Password Input Component
const PasswordInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className={`py-6 ${className ?? ''}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {isFocused && (
        <span className="absolute right-1 lg:right-2 top-1/2 -translate-y-1/2">
          <MotionButton
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleShowPassword}
            className="p-3 lg:p-2 *:!size-5 lg:*:!size-4"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </MotionButton>
        </span>
      )}
    </div>
  );
};

// 👤 Username Input Component
type UsernameInputProps = {
  usernameVerified?: boolean;
  isPending?: boolean;
  validUsername?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const UsernameInput = ({
  usernameVerified,
  isPending,
  validUsername,
  className,
  ...props
}: UsernameInputProps) => {
  const renderRightIcon = () => {
    if (!validUsername) return null;

    if (isPending)
      return <Spinner className="size-[18px] text-foreground/50" />;

    if (usernameVerified)
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.6,
            type: 'spring',
            stiffness: 200,
            mass: 0.5,
            damping: 20,
          }}
          className="text-white dark:text-foreground bg-chart-4 p-[2px] rounded-full"
        >
          <CircleCheckBig className="size-[18px]" />
        </motion.div>
      );

    return (
      <span className="text-destructive bg-destructive/20 p-[2px] rounded-full">
        <OctagonAlert className="size-[18px]" />
      </span>
    );
  };

  return (
    <div className="relative">
      <Input
        {...props}
        type="text"
        placeholder="vibequeen848"
        className={`py-6 pl-7 lg:pl-8 ${className ?? ''}`}
      />
      <span className="absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 p-[2px] rounded-full">
        @
      </span>

      <span className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2">
        {renderRightIcon()}
      </span>
    </div>
  );
};

export { PasswordInput, UsernameInput };
