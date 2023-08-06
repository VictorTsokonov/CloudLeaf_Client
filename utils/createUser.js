import { API_BASE_URL } from '@/config'
async function createUser(github_username, github_access_token) {
  const response = await fetch(
    `${API_BASE_URL}/api/users?github_username=${github_username}&github_access_token=${github_access_token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const user = await response.json()
  return user
}

export default createUser
