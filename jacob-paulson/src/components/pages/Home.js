import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { PlayIcon } from "@heroicons/react/solid";

const spotifyApi = new SpotifyWebApi();

export default function Home() {
  const [hovered, setHovered] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const [tracks, setTracks] = useState([
    {
      title: "WDYCMB",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 1,
      preview_url:
        "https://p.scdn.co/mp3-preview/b3b3a34398db2621c1f295ba564b5fd40591705e?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e025b91790572cfe303ca881d19",
      url: "https://open.spotify.com/track/6s29WbUwDFYqafpBOq0EdJ",
    },
    {
      title: "Baja Estatura",
      artist: "Ignacio Arocena",
      role: "Recording Engineer",
      id: 2,
      preview_url:
        "https://p.scdn.co/mp3-preview/145429845a991506e92359a661ef03a3dca4f843?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e026b9e8b574e527e99a59129fd",
      url: "https://open.spotify.com/track/6De9Kq7jkWoxrM6cH6dbvS",
    },
    {
      title: "Float",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 3,
      preview_url:
        "https://p.scdn.co/mp3-preview/3c63a4812fc211120b4a47b5356c53d37049116b?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e02d125dd06ed58133af32b8fa5",
      url: "https://api.spotify.com/v1/albums/3Cl64YbZuvJawGQlDrQwPA",
    },
    {
      title: "Feeling",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 4,
      preview_url:
        "https://p.scdn.co/mp3-preview/bc31870f14686065cd320d16bb75c815d3e31396?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e02e7d240da66728c6f6f1a45a2",
      url: "https://api.spotify.com/v1/albums/5k6CjxeT6iHb8q7Hw7jMqY",
    },
    {
      title: "very, Ivan!",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 5,
      preview_url:
        "https://p.scdn.co/mp3-preview/a62579c9d61d538ceaa83faae8273d53d03dc718?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e02368413bb211e7960917f21cb",
      url: "https://api.spotify.com/v1/albums/5k6CjxeT6iHb8q7Hw7jMqY",
    },
    {
      title: "Why Can't We See",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 6,
      preview_url:
        "https://p.scdn.co/mp3-preview/8dfc306351f9ceeac43e136f165a743d5137fdbd?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e027bba764fe1a5122bcdbbb0a5",
      url: "https://api.spotify.com/v1/albums/4QIYgZzM8VqAIwJyeltmnV",
    },
    {
      title: "Tokyo",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 7,
      preview_url:
        "https://p.scdn.co/mp3-preview/c7dedfad455ba5cdd65585452a7bc083f1e61004?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e0281c046e99a847c653b5accca",
      url: "https://api.spotify.com/v1/tracks/71vhQAgQtgeZVe0yILrUSg",
    },
    {
      title: "Fujicam",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 8,
      preview_url:
        "https://p.scdn.co/mp3-preview/2d04eb891e728d6b93f789c7830a6157a17f4322?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e02668c5c78a4266900075d851f",
      url: "https://api.spotify.com/v1/albums/3fzXNX9hGxAvd4Qy2gwdnJ",
    },
    {
      title: "Make Your Bed",
      artist: "BLUSH",
      role: "Producer and Engineer",
      id: 9,
      preview_url:
        "https://p.scdn.co/mp3-preview/0c31b8d2593f22815fa3c258d64e3c27329d2f7f?cid=1c233dbd0b694d94b6db629e09c86249",
      images:
        "https://i.scdn.co/image/ab67616d00001e027d0912f34a62456daaacb36a",
      url: "https://api.spotify.com/v1/albums/7nZ2iw6SYV3XeFG2p6WSXW",
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
      console.log(response.tracks.items);
      logPreviewUrl(response.tracks.items[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  const logPreviewUrl = async (trackId) => {
    try {
      const response = await spotifyApi.getTrack(trackId);
      console.log(response.preview_url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccessToken().then(() => {
      searchTracks();
    });
  }, []);

  const handleMouseEnter = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handlePlayClick = (track) => {
    setSelectedTrack(track);
    setPlayerVisible(true);
  };

  const handleDrawerClose = () => {
    setSelectedTrack(null);
    setPlayerVisible(false);
  };

  return (
    <>
      {isPlayerVisible && (
        <div className="drawer open">
          <div className="flex items-center justify-center h-full">
            {selectedTrack && (
              <>
                <input
                  id={selectedTrack.id}
                  type="checkbox"
                  className="drawer-toggle"
                  checked={isPlayerVisible}
                  onChange={handleDrawerClose}
                />
                <div className="drawer-content">
                  <audio src={selectedTrack.preview_url} controls autoPlay />
                  <button className="close-button" onClick={handleDrawerClose}>
                    Close
                  </button>
                </div>
                <div className="drawer-side">
                  <input
                    id={selectedTrack.id + "-content"}
                    type="checkbox"
                    className="drawer-toggle"
                    checked={isPlayerVisible}
                    onChange={handleDrawerClose}
                  />
                  <label
                    htmlFor={selectedTrack.id + "-content"}
                    className="drawer-overlay"
                  ></label>

                  <h1>{selectedTrack.title}</h1>
                  <h2>{selectedTrack.artist}</h2>
                  <img
                    className="rounded"
                    src={selectedTrack.images}
                    alt={selectedTrack.title}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 place-content-evenly gap-4 p-36">
        {tracks.map((track) => (
          <div
            key={track.id}
            onMouseEnter={() => handleMouseEnter(track.id)}
            onMouseLeave={handleMouseLeave}
            className="relative h-full"
          >
            {/* Track image and overlay */}
            <img className="rounded" src={track.images} alt={track.title} />
            {hovered === track.id && (
              <div
                className="transition-opacity duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <div className="text-white text-center">
                  <h1 className="text-lg font-medium mb-2">{track.title}</h1>
                  <h2 className="text-md mb-3 text-gray-300">{track.artist}</h2>
                  <p className="text-sm mb-3 text-gray-300">{track.role}</p>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => handlePlayClick(track)}
                  >
                    <PlayIcon className="h-5 w-5 mr-1" />
                    Play
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
