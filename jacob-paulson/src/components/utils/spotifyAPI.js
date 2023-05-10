import { useState, useEffect } from "react";
import SporifyWebApi from "spotify-web-api-js";

const spotifyApi = new SporifyWebApi();

export default function AlbumCards(props) {
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hovered, setHovered] = useState(null);

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
          setIsAuthenticated(true);
          spotifyApi.setAccessToken(data.access_token);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsAuthenticated(false);
      const redirectUri = encodeURIComponent(window.location.origin);
      window.location = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user-read-playback-state%20user-modify-playback-state`;
    }
  }, []);

  const playTrack = (trackId) => {
    spotifyApi
      .play({
        uris: [`spotify:track:${trackId}`],
      })
      .then(() => {
        console.log(`Playing Track ${trackId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMouseEnter = (id) => {
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <>
      <div className="place-items-center grid grid-cols-4 p-4 gap-2">
        {props.albums.map((album) => (
          <div
            key={album.id}
            onClick={() => playTrack(album.trackId)}
            onMouseEnter={() => handleMouseEnter(album.id)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={album.image} alt={album.title} />
            {hovered === album.id && (
              <div className="transition-opacity duration-300 absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <h3 className="text-lg font-medium mb-2">{album.title}</h3>
                  <p className="text-sm mb-3 text-gray-300">{album.role}</p>
                  <a
                    href={album.trackId}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-800 px-4 py-2 rounded-full mt-4 transition-all duration-300 hover:bg-gray-800 hover:text-white"
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
