import axios from "axios";
import { useEffect, useState } from "react";

export default function Preview() {
  const CLIENT_ID = "1c233dbd0b694d94b6db629e09c86249";
  const REDIRECT_URI = "http://localhost:3000/test";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
//curently set to search for artist by id and return their tracks
  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${searchKey}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          market: "US", // Specify the market for the search (e.g., "US")
        },
      }
    );
    console.log(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
        ) : (
          <button className="btn" onClick={logout}>
            Logout
          </button>
        )}

        {token ? (
          <form onSubmit={searchTracks}>
            {" "}
            {/* Use the updated searchTracks function */}
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type={"submit"}> Search</button>
          </form>
        ) : (
          <h2>Please Login</h2>
        )}
      </header>
    </div>
  );
}
