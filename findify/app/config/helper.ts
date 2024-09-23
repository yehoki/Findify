import { TrackObject } from "../types/SpotifyTypes";

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
  const fixedSeconds =
    remainingSeconds === 0
      ? '00'
      : remainingSeconds < 10
      ? `0${remainingSeconds}`
      : remainingSeconds;
  return `${minutes}:${fixedSeconds}`;
};

export const getTimeFromNow = (epoch: number) => {
  var seconds = Math.floor((new Date().getTime() - epoch) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' month ago'
      : Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' day ago'
      : Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' hour ago'
      : Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' minute ago'
      : Math.floor(interval) + ' minutes ago';
  }
  return 'A few seconds ago';
};

export const parseGenre = (genre: string) => {
  const replaceUrlSpaces = genre.replaceAll('%20', '%2B');
  const replacesSpaces = replaceUrlSpaces.replaceAll(' ', '%2B');
  return replacesSpaces;
};


export const exportPlaylist = (tracks: TrackObject[]) => {
  const transformedTracks: string[][] = [];
  tracks.forEach(track => {
    const transformedTrack = [
      track.id,
      track.name,
      track.artists[0].name,
      track.external_urls.spotify
    ];
    transformedTracks.push(transformedTrack);
  })
  const transformedTracksString = transformedTracks.map(tTrack => tTrack.join(',')).join('\n');
  const uri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(transformedTracksString);
  const link = document.createElement('a');
  link.href = uri;
  link.download = `Playlist.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return;
}