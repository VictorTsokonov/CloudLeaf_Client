async function checkStatus(ipAddressAndPort, full_name) {
  console.log("YEEEE FETCHING THIS BISH -->", ipAddressAndPort);

  try {
    const response = await fetch(`http://localhost:8080/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ipAddressAndPort: ipAddressAndPort,
        repoName: full_name,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error up so the caller can decide what to do
  }
}

export default checkStatus;
