import { API_BASE_URL } from '@/config'
const getAccessToken = async (code) => {
  const response = await fetch(`${API_BASE_URL}/getAccessToken?code=` + code, {
    method: 'GET',
  })
  const data = await response.json()
  if (data.access_token) {
    localStorage.setItem('accessToken', data.access_token)
  }
  return data.access_token
}

export default getAccessToken
