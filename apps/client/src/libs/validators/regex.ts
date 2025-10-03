const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const PSEUDO_REGEX = /^[^\s]+(\s+\S+){0,2}$/;

export { EMAIL_REGEX, USERNAME_REGEX, PSEUDO_REGEX };
