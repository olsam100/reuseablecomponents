import { CONFIG } from 'context'

export const client = async (
  endpoint,
  { body, token, ...customConfig } = {}
) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    body,
  }

  try {
    const response = await window.fetch(`${CONFIG.baseUrl}/${endpoint}`, config)
    if (response.ok) {
      return await response.json()
    } else {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

// iamolumide@gmail.com password!
