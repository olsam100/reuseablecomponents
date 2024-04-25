import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function useAppContext() {
  return useContext(AppContext)
}

export const CONFIG = {
  baseUrl:
    process.env.REACT_APP_API || 'https://whale-app-b33e5.ondigitalocean.app',
}

export function AppProvider({ children }) {
  const [projectInfo, setProjectInfo] = useState({
    dataset: 'prodigy_demo',
    viewId: 'ner_manual',
  })

  const [progressInfo, setProgressInfo] = useState({
    thisSession: 0,
    total: 0,
    progressValue: 0,
    acceptCount: 0,
    rejectCount: 0,
    ignoreCount: 0,
  })

  return (
    <AppContext.Provider
      value={{
        projectInfo,
        setProjectInfo,
        progressInfo,
        setProgressInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
