import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const timeAgo = (date: string) => {
  const timeAgo = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  });

  // mamadika ho fohy
  const shortTime = timeAgo
    .replace('minute', 'min')
    .replace('minutes', 'mn')
    .replace('heure', 'h')
    .replace('heures', 'hs')
    .replace('jour', 'jr')
    .replace('jours', 'jrs')
    .replace('il y a moins d’une min', "A l'instant")
    .replace('environ', '')
    .replace('il y a', '');

  return shortTime;
};

export default timeAgo;
