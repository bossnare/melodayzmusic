'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const LoadingOverlay = ({ show }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return show
    ? createPortal(
        <div className="inset-0 z-12 bg-black/40 fixed"></div>,
        document.body
      )
    : null;
};

export default LoadingOverlay;
