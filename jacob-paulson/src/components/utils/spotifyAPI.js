import { useState, useEffect } from "react";
import SporifyWebApi from "spotify-web-api-js";

const spotifyApi = new SporifyWebApi();

export default function albumCards(props) {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      fetch("/api/spotify/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAccessToken(data.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const redirectUri = encodeURIComponent(window.location.origin);
      window.location = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user-read-playback-state%20user-modify-playback-state`;
    }
  }, []);

  const playTrack = () => {
    spotifyApi
      .play({
        uris: [`spotify:track ${trackId}`],
      })
      .then(() => {
        console.log(`Playing Track ${trackId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
