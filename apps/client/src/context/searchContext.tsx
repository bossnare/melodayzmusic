'use client';

import { useToggle } from '@/hooks/use-toggle';
import { createContext, useContext } from 'react';
import { useRef } from 'react';
import { type BaseProps } from '@/types/base.interface';

type SearchContextType = {
  setIsOpenSearchFalse: () => void;
  setIsOpenSearch: () => void;
  isOpenSearch: boolean;
  isNull: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  setIsNull: () => void;
  setIsNullFalse: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: BaseProps) {
  const {
    value: isOpenSearch,
    setTrue: setIsOpenSearch,
    setFalse: setIsOpenSearchFalse,
  } = useToggle();
  const {
    value: isNull,
    setTrue: setIsNull,
    setFalse: setIsNullFalse,
  } = useToggle(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <SearchContext
      value={{
        // ux
        isOpenSearch,
        setIsOpenSearch,
        setIsOpenSearchFalse,
        isNull,
        setIsNull,
        setIsNullFalse,
        inputRef,
      }}
    >
      {children}
    </SearchContext>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used inside SearchProvider');
  return ctx;
}
