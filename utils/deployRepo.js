async function deployRepo(fullName, cloneUrl, sshUrl) {
  const response = await fetch(
    `http://localhost:8080/api/deploy?full_name=${fullName}&clone_url=${cloneUrl}&ssh_url=${sshUrl}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export default deployRepo;

//  http://localhost:8080/api/deploy/
// `http://localhost:8080/api/deploy?full_name=TestHostRepo&clone_url=https://github.com/VictorTsokonov/TestHostRepo.git&ssh_url=git@github.com:VictorTsokonov/TestHostRepo.git`
