'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { Input } from '@/components/ui/input';
import { CircleCheckBig, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

export const PasswordInput = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
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
} & React.InputHTMLAttributes<HTMLInputElement>;

export const UsernameInput = ({
  usernameVerified,
  isPending,
  ...props
}: UsernameInputProps) => {
  return (
    <div className="relative">
      <Input
        placeholder="@vibequeen848"
        type="text"
        className="py-6"
        {...props}
      />
      {isPending && (
        <span className="absolute -translate-y-1/2 right-2 lg:right-3 top-1/2 p-[2px] rounded-full">
          <div className="size-[18px] border-2 border-foreground/50 border-t-transparent rounded-full animate-spin"></div>
        </span>
      )}
      {!isPending && usernameVerified && (
        <span className="absolute -translate-y-1/2 right-2 lg:right-3 top-1/2 p-[2px] rounded-full bg-chart-4">
          <CircleCheckBig className="size-[18px]" />
        </span>
      )}
    </div>
  );
};
