'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
        <span className="absolute -translate-y-1/2 right-2 top-1/2">
          <MotionButton
            type="button"
            className="*:!size-5 lg:*:!size-4"
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
