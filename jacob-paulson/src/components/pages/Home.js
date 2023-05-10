import { useEffect, useState } from "react";
import SpotifyCard from "../utils/SpotifyCard";

export default function Home() {
  const [albums, setAlbums] = useState([
    {
      title: "Very!, Ivan!",
      role: "Producer and Engineer",
      id: 1,
      trackId:
        "https://p.scdn.co/mp3-preview/c69ccf7a670d05f9c9d9425a478ae79c1f2d801b?cid=774b29d4f13844c495f206cafdad9c86",
      img: "https://placehold.co/300",
    },
  ]);
  return (
    <>
      <SpotifyCard albums={albums} />;
    </>
  );
}
