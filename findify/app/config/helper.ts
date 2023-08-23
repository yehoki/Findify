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