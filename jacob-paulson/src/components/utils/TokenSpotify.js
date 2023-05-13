const getToken = async () => {
  const clientId = "1c233dbd0b694d94b6db629e09c86249";
  const clientSecret = "1f830405e4de468b8165cd4a88da02be";

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

  console.log("Access token:", access_token);

  return access_token;
};
