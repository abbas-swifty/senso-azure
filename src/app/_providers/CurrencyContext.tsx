import React, { createContext, useContext, useState, useEffect } from 'react'
import { Settings } from '../../payload/payload-types'
import { fetchSettings } from '../_api/fetchGlobals'

interface CurrencyContextType {
  currency: string
  setCurrency: (currency: string) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<string>('LBP')

  useEffect(() => {
    const fetchSettingsNew = async () => {
      let settings: Settings | null = null

      try {
        settings = await fetchSettings()
        setCurrency(settings?.siteCurrency || 'LBP')
      } catch (error) {
        console.error(error)
      }
    }

    fetchSettingsNew()
  }, [])

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
