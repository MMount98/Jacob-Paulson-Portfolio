import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const CLIENT_ID = "1c233dbd0b694d94b6db629e09c86249";
  const REDIRECT_URL = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtist] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");

    if (!storedToken && hash) {
      storedToken = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", storedToken);
    }

    setToken(storedToken);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const search = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtist(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img className="flex items-center justify-center w-2/6" src={artist.images[0].url} alt={artist.name} />
        ) : (
          <div> No Image Found </div>
        )}
        {artist.name}
      </div>
    ));
  };

  return (
    <>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}`}
        >
          Login to spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      {token ? (
        <form onSubmit={search}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>
      ) : (
        <h2>Please Login</h2>
      )}

      {renderArtists()}
    </>
  );
}
