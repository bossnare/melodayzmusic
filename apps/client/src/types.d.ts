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

// for color thief lib
declare module 'colorthief' {
  export default class ColorThief {
    getColor(image: HTMLImageElement | HTMLCanvasElement): number[];
    getPalette(
      image: HTMLImageElement | HTMLCanvasElement,
      number: number
    ): number[][];
  }
}
