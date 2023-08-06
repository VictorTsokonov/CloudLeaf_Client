import { API_BASE_URL } from '@/config'
function deleteRDSDatabase(githubName, databaseName) {
  const url = `${API_BASE_URL}/api/deleteDatabase?githubName=${githubName}&databaseName=${databaseName}`

  return fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.error || 'Failed to delete database.')
        })
      }
      return response.json()
    })
    .catch((error) => {
      console.error('Error deleting database:', error)
      throw error
    })
}

export default deleteRDSDatabase
