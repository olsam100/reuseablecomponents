import { client } from 'context/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useAcceptLabel = () => {
  const queryClient = useQueryClient()

  const acceptLabel = async ({ id, entities }) => {
    const response = await client(`label/${id}/accept`, {
      method: 'POST',
      body: JSON.stringify({ entities }),
      token: localStorage.getItem('token'),
    })
    return response.data
  }

  const mutation = useMutation(acceptLabel, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('label')
    },
  })

  return mutation
}

const useRejectLabel = () => {
  const queryClient = useQueryClient()

  const rejectLabel = async ({ id, entities }) => {
    const response = await client(`label/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ entities }),
      token: localStorage.getItem('token'),
    })
    return response.data
  }

  const mutation = useMutation(rejectLabel, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('label')
      console.log('Label rejected:', data)
    },
  })

  return mutation
}

const useIgnoreLabel = () => {
  const queryClient = useQueryClient()

  const ignoreLabel = async ({ id, entities }) => {
    const response = await client(`label/${id}/ignore`, {
      method: 'POST',
      body: JSON.stringify({ entities }),
      token: localStorage.getItem('token'),
    })
    return response.data
  }

  const mutation = useMutation(ignoreLabel, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('label')
      console.log('Label ignored:', data)
    },
  })

  return mutation
}

const useLogin = () => {
  const login = async ({ email, password }) => {
    const response = await client('auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    return response.data
  }

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      const token = data.token
      localStorage.setItem('token', token)
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })

  return mutation
}

const useRegister = () => {
  const register = async (formData) => {
    const response = await client('auth/register', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
    return response.data
  }

  const mutation = useMutation(register, {
    onSuccess: (data) => {
      // const token = data
      console.log(data)
      // localStorage.setItem('token', token.id)
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })

  return mutation
}

export { useAcceptLabel, useRejectLabel, useIgnoreLabel, useLogin, useRegister }
