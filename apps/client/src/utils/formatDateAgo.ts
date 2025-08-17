import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const formatDateAgo = (date: string) => {
  const timeAgo = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  });

  // mamadika ho fohy
  const shortTime = timeAgo
    .replace("minute", "min")
    .replace("mins", "ms")
    .replace("heure", "h")
    .replace("heures", "h")
    .replace("jour", "j")
    .replace("jours", "j")
    .replace("il y a moins d’une min", "Tout juste")
    .replace("environ", "").replace("il y a", "")
    .replace("dans moins d'une min", "Tout juste");

  return shortTime;
};

export default formatDateAgo;

