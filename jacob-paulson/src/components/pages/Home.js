import { useEffect, useState } from "react";
import SpotifyCard from "../utils/SpotifyCard";
import getToken from "../utils/TokenSpotify";

export default function Home() {
  const token = getToken();

  const [albums, setAlbums] = useState([
    {
      title: "Very!, Ivan!",
      role: "Producer and Engineer",
      id: 1,
      trackId: "11dFghVXANMlKmJXsNCbNl",
      img: "https://placehold.co/300",
    },
  ]);
  return (
    <>
        
          <SpotifyCard token={token} albums={albums} />;   
 
    </>
  );
}
