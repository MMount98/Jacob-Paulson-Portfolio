import { useEffect, useState } from "react";
import albumCards from "../utils/spotifyAPI";

export default function Home() {
  const [albums, setAlbums] = useState([
    {
      title: "Very!, Ivan!",
      role: "Producer and Engineer",
      id: 1,
      trackId: "3USiT490xuabOBrGrXTsVz",
      img: "https://open.spotify.com/embed/track/3USiT490xuabOBrGrXTsVz?",
    },
  ]);
  return (
    <>
      <albumCards albums={albums} />
    </>
  );
}
