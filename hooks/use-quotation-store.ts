'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Item } from '@/lib/items'
import type { Settings, QuoteLine } from '@/lib/pricing'
import { generateId } from '@/lib/pricing'

const STORAGE_KEY = 'surya-quotation-v1'

interface StoredData {
  settings: Settings
  lines: QuoteLine[]
  lastUpdated: string
}

const defaultSettings: Settings = {
  baseRate: 51500,
  termAdj: 0,
  gstPct: 18,
}

export function useQuotationStore() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [lines, setLines] = useState<QuoteLine[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data: StoredData = JSON.parse(stored)
        setSettings(data.settings)
        setLines(data.lines)
      }
    } catch {
      // Use defaults on error
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return
    const data: StoredData = {
      settings,
      lines,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [settings, lines, isLoaded])

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }, [])

  const addLine = useCallback((item: Item, qty: number) => {
    const newLine: QuoteLine = {
      id: generateId(),
      item,
      qty,
    }
    setLines(prev => [...prev, newLine])
  }, [])

  const removeLine = useCallback((id: string) => {
    setLines(prev => prev.filter(l => l.id !== id))
  }, [])

  const clearLines = useCallback(() => {
    setLines([])
  }, [])

  return {
    settings,
    lines,
    isLoaded,
    updateSettings,
    addLine,
    removeLine,
    clearLines,
  }
}
