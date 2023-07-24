const getRepos = async (accessToken) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
  };
  if (!accessToken) {
    console.log("no access token found");
    return;
  }
  try {
    const response = await fetch(
      "https://api.github.com/user/repos?type=owner",
      {
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Fetch user data here
    const responseUser = await fetch("https://api.github.com/user", {
      headers,
    });

    if (!responseUser.ok) {
      throw new Error(`HTTP error! status: ${responseUser.status}`);
    }

    const dataUser = await responseUser.json();

    return { repos: data, user: dataUser };
  } catch (error) {
    console.error("Error:", error);
  }
};

export default getRepos;
