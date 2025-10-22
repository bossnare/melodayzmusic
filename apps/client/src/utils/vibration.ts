export function vibrate(type: 'low' | 'subtle' | 'soft' | 'medium' | 'strong') {
  if (!('vibrate' in navigator)) return;

  switch (type) {
    case 'low':
      navigator.vibrate(25);
      break;
    case 'subtle':
      navigator.vibrate([15, 5, 10]);
      break;
    case 'soft':
      navigator.vibrate(100);
      break;

    case 'medium':
      navigator.vibrate([200, 50, 200]);
      break;

    case 'strong':
      navigator.vibrate([300, 100, 300, 100, 300]);
      break;
  }
}
