async function deployRepo(
  fullName,
  cloneUrl,
  sshUrl,
  port,
  dependenciesList,
  env
) {
  const payload = {
    full_name: fullName,
    clone_url: cloneUrl,
    ssh_url: sshUrl,
    port: port,
    dependencies: dependenciesList,
    environments: env,
  };
  console.log(payload);

  const response = await fetch(`http://localhost:8080/api/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export default deployRepo;
