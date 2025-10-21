export function vibrate(type: 'low' | 'soft' | 'medium' | 'strong') {
  if (!('vibrate' in navigator)) return;

  switch (type) {
    case 'low':
      navigator.vibrate(30);
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
