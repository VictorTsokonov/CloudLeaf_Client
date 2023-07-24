// utils/getAccessToken.js

const getAccessToken = async (code) => {
  const response = await fetch(
    "http://localhost:8080/getAccessToken?code=" + code,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  if (data.access_token) {
    localStorage.setItem("accessToken", data.access_token);
  }
  return data.access_token;
};

export default getAccessToken;
