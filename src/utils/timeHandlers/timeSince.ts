export function timeSince(date: number) {
  const seconds = Math.floor((Date.now() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }

  const secs = Math.floor(seconds);
  if (secs === 0) return 0;

  return secs + " seconds";
}

export const getTimeSince = (createdAt: number) => {
  const res = timeSince(createdAt);
  if (res === 0) {
    return "just now";
  } else {
    return res + " ago";
  }
};
