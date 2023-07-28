async function deployRepo(fullName, cloneUrl, sshUrl, port, dependenciesList) {
  // console.log({ fullName, cloneUrl, sshUrl, port, dependenciesList });

  const response = await fetch(`http://localhost:8080/api/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      full_name: fullName,
      clone_url: cloneUrl,
      ssh_url: sshUrl,
      port: port,
      dependencies: JSON.stringify(dependenciesList),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export default deployRepo;
