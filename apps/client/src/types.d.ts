declare module 'country-flag-emoji' {
  interface Country {
    code: string;
    emoji: string;
    name: string;
    unicode: string;
  }

  const countryFlagEmoji: {
    get: (code: string) => Country | undefined;
    list: Country[];
  };

  export default countryFlagEmoji;
}
