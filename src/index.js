import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AppProvider } from '../src/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: Infinity,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
