async function checkStatus(ipAddressAndPort) {
  console.log("YEEEE FETCHING THIS BISH -->", ipAddressAndPort);
  while (true) {
    try {
      const response = await fetch(
        `http://localhost:8080/status?ipAddressAndPort=${ipAddressAndPort}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // wait 5 seconds before the next try
    }
  }
}

export default checkStatus;
