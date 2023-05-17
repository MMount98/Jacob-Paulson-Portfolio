import { useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

export default function SongSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await spotifyApi.searchTracks(`track:${searchTerm}`);
      setSearchResults(response.tracks.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const logPreviewUrl = async (trackId) => {
    try {
      const response = await spotifyApi.getTrack(trackId);
      console.log(response.preview_url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <h3>{result.name}</h3>
            <p>Artists: {result.artists.map((artist) => artist.name).join(", ")}</p>
            <p>Album: {result.album.name}</p>
            <img src={result.album.images[0].url} alt={`Cover art for ${result.name}`} />
            <button onClick={() => logPreviewUrl(result.id)}>Log Preview URL</button>
          </li>
        ))}
      </ul>
    </div>
  );
}