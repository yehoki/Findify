export const parseArtists = (artists: string[]) => {
  if (artists.length === 0) {
    return '';
  }
  if (artists.length === 1) {
    return artists[0];
  }
  let parsedArtists = artists[0];
  for (let i = 1; i < artists.length; i++) {
    parsedArtists += `, ${artists[i]}`;
  }
  return parsedArtists;
};

export const convertSecondsToMinutes = (seconds: number) => {
  if (seconds <= 0) {
    return 0;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds === 0 ? '00': remainingSeconds}`;
};
