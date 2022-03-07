export function millisToMinutesAndSeconds(millis: number) {
  if (millis == 0) return "0:00";
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.round((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export function secondsToMillis(seconds: number) {
  return Math.round(seconds * 1000);
}

export function millisToSeconds(seconds: number) {
  return Math.fround(seconds / 1000);
}

export function editTitle(title: string, maxChars: number) {
  return `${title.substring(0, maxChars)}${title.length > maxChars ? "..." : ""}`;
}
