export const production = process.env.NODE_ENV === 'production';
export const development = process.env.NODE_ENV === 'development';
export const local = process.env.NODE_ENV === 'local';
export const test = process.env.NODE_ENV === 'test';

export const port = process.env.PORT ?? 5000;
export const clientUrl =
  process.env.CLIENT_URL ?? 'https://melodayzmusic.vercel.app';
export const apiDocs = process.env.API_DOCS_URL;
