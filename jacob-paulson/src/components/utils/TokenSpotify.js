const getToken = async () => {
  const clientId = ""
  const clientSecret = ""

  // Step 1: Request authorization from the user
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate with Spotify API");
  }

  // Step 2: Retrieve the access token from the response
  const { access_token } = await response.json();

  return access_token;
};

export default getToken;
