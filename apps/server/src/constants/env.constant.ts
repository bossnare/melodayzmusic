export const production = process.env.NODE_ENV === 'production';
export const development = process.env.NODE_ENV === 'development';
export const local = process.env.NODE_ENV === 'local';
export const test = process.env.NODE_ENV === 'test';

export const port = process.env.PORT ?? 5000;
