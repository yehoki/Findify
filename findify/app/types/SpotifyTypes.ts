export interface MyTopTracks {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  items: TrackObject[];
}

export interface MyTopArtists {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  items: ArtistObject[];
}

export interface TrackObject {
  album: {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
      reason: string;
    };
    type: string;
    uri: string;
    copyrights: CopyrightObject[];
    external_ids: {
      isrc: string;
      ean: string;
      upc: string;
    };
    genres: string[];
    label: string;
    popularity: number;
    album_group: string;
    artists: SimplifiedArtistObject[];
  };
  artists: ArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface ArtistObject {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: string;
  };
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface CopyrightObject {
  text: string;
  type: string;
}

export interface ImageObject {
  url: string;
  height: string | null;
  width: string | null;
}

export interface SimplifiedArtistObject {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}