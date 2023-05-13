import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

export default function Home() {
  const [tracks, setTracks] = useState([
    {
      title: "Very!, Ivan!",
      role: "Producer and Engineer",
      id: 1,
      preview_url:
        "https://p.scdn.co/mp3-preview/2726a9595503bf33fdf44d0e85ae8abc7d876d44?cid=774b29d4f13844c495f206cafdad9c86",
      images: "https://placehold.co/300",
    },
  ]);

  const getAccessToken = async () => {
    const response = await fetch("/api/spotify-auth");
    const { access_token } = await response.json();
    spotifyApi.setAccessToken(access_token);
  };

  const searchTracks = async () => {
    try {
      const response = await spotifyApi.searchTracks("track:Paranoid Android");
      setTracks(response.tracks.items);
      console.log(response.tracks.items); // log all track information to console
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccessToken().then(() => {
      searchTracks();
    });
  }, []);

  return (
    <>
      {tracks.map((track) => (
        <div key={track.id}>
          <h2>{track.name}</h2>
          <img src={track.images} alt={track.title} />
          <audio controls>
            <source src={track.preview_url} type="audio/mpeg" />
          </audio>
        </div>
      ))}
    </>
  );
}
