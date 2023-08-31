# Findify

Findify is a fully responsive, Spotify client themed web application, using the Spotify Web API to display the user's top tracks & artists, let them explore common artists and find new song recommendations based on their recent tracks.


## Disclaimer


> **At the time of writing this (30/08/2023) this application has not yet been approved for quota extension.**
**Until then, the Spotify Web API only allows up to 25 users to use the service at a time, each need to be manually added on the platform.**
**Should you be interested in using the application, feel free to reach out to me, I will be happy to add your user.**
**In the meantime, here is a [YouTube video](https://www.youtube.com/watch?v=eMHTDfCbId4&ab_channel=PatrykSienniak) demonstrating the app in use.**
 

## Table of Contents

- [Usage](#usage)
- [Architecture](#architecture)
  - [Frontend](#frontend)
    - [Frontend routes](#frontend-routes)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Usage

- Login with a valid Spotify account, ideally which you have used in the past few weeks for best results.
- View your top tracks, artists and related genres based on 3 different time periods: 4 weeks, 6 months and lifelong.
- View individual tracks, artists and genres, and find similar ones.
- Find song recommendations based on your listening history, with the ability to configure them based on the track's information - such as popularity and tempo, and add a new playlist with all related songs to your Spotify account.

## Architecture

Findify is a modern web application, using the [Next.js](https://nextjs.org/) framework.

### Frontend

- The main part of the frontend is developed using Typescript for type safety, alongside the React library.
- Redux for state management.
- Material UI for some UI features.
- TailwindCSS for styling, as well as simple responsive design with media queries.

#### Frontend routes


- `/` Home page displaying the user's top tracks, artists and genres, their recent listening history, somes recommendations in the layout of a Spotify client.

- `/track/[trackId]` Displays an individual track, and information related to it.

- `/artist/[artistId]` Displays an individual artist, their top songs and artists related to them.

- `/genre/[genreName]` Displays an individual music genre, genres related to it and top artists related to the genre

- `/search` Displays search results based on the user's query, displaying matching tracks, artists and albums

- `/recommendations` Displays 5 top tracks randomly and sliders to adjust for multiple music properties, a button generating recommendations based on the user's preference and ability to add a new personalised playlist to the user's Spotify account.

### Backend

- Using the [Spotify Web API](https://developer.spotify.com/documentation/web-api) for fetching Spotify data.

## License

This project is free to use to anyone publicly.

## Acknowledgements

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [MaterialUI](https://mui.com/)
- [Next.js](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [React.js](https://react.dev/)
- [Redux](https://redux.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
