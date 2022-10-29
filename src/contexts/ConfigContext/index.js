import React, { createContext, useState, useContext, useEffect } from 'react'
import settings from '../../setting.json'
/**
 * Create ConfigContext
 * This context will manage the current configs internally and provide an easy interface
 */
export const ConfigContext = createContext()

/**
 * Custom provider to configs manager
 * This provider has a reducer for manage configs state
 * @param {props} props
 */
export const ConfigProvider = ({ children }) => {
  const [state, setState] = useState({ loading: true, configs: {} })
  const endpoint = '/settings'
  const server = settings?.server + endpoint

  const getSettings = async () => {
    try {
      setState({
        ...state,
        loading: true
      })
      const response = await fetch(server, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json()
      setState({
        loading: false, configs: { ...result, currency: 'KWD' }
      })
    } catch (err) {
      console.log(err, 'error')
      setState({
        loading: false, configs: err
      })
    }

  }

  const refreshConfigs = () => {
    getSettings()
  }
  const functions = {
    refreshConfigs
  }

  useEffect(() => {
    getSettings()
  }, [])

  return (
    <ConfigContext.Provider value={[state, functions]}>
      {children}
    </ConfigContext.Provider>
  )
}

/**
 * Hook to get and update configs state
 */
export const useConfig = () => {
  const configManager = useContext(ConfigContext)
  return configManager || [{}, async () => { }]
}
