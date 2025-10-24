import jwtDecode from 'jwt-decode';

// temporaire
interface Payload {
  exp: number;
  username: string;
  id: string;
  role: string[];
}

export function isValidToken(token: string) {
  if (token && token.includes('.')) {
    // if you aren't use jwtDecode lib
    // const payload = JSON.parse(atob(token.split('.')[1]))
    const payload = jwtDecode<Payload>(token);
    const currentTime = Date.now() / 1000;

    // check is expired or lived
    return payload.exp > currentTime;
  }
  // check length
  return token.length > 0;
}
