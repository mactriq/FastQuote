'use client'

import { useState, useEffect, useCallback } from 'react'
import { Item, ITEMS } from '@/lib/items'

const STORAGE_KEY = 'arihant-items-custom'

export interface CustomItem extends Item {
  id: string
  isCustom?: boolean
}

function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Merge default items with custom items from localStorage
function mergeItems(customItems: CustomItem[]): CustomItem[] {
  const defaultItems: CustomItem[] = ITEMS.map((item, index) => ({
    ...item,
    id: `default-${index}`,
    isCustom: false,
  }))
  
  // Create a map for quick lookup of custom overrides
  const customMap = new Map<string, CustomItem>()
  customItems.forEach(item => {
    if (item.isCustom) {
      customMap.set(item.id, item)
    } else {
      // Override default item
      const key = `${item.type}-${item.size}-${item.thick}`
      customMap.set(key, item)
    }
  })
  
  // Apply overrides to default items
  const merged = defaultItems.map(item => {
    const key = `${item.type}-${item.size}-${item.thick}`
    const override = customMap.get(key)
    if (override && !override.isCustom) {
      return { ...item, ...override, id: item.id }
    }
    return item
  })
  
  // Add purely custom items
  customItems.forEach(item => {
    if (item.isCustom) {
      merged.push(item)
    }
  })
  
  return merged
}

export function useItemsStore() {
  const [customItems, setCustomItems] = useState<CustomItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCustomItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error('Failed to load custom items:', e)
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems))
    }
  }, [customItems, isLoaded])

  const items = mergeItems(customItems)

  const addItem = useCallback((item: Omit<Item, 'id'>) => {
    const newItem: CustomItem = {
      ...item,
      id: generateId(),
      isCustom: true,
    }
    setCustomItems(prev => [...prev, newItem])
    return newItem
  }, [])

  const updateItem = useCallback((id: string, updates: Partial<Item>) => {
    // Check if it's a default item being modified
    if (id.startsWith('default-')) {
      const defaultItem = items.find(i => i.id === id)
      if (defaultItem) {
        setCustomItems(prev => {
          const key = `${defaultItem.type}-${defaultItem.size}-${defaultItem.thick}`
          const existingIndex = prev.findIndex(i => 
            !i.isCustom && `${i.type}-${i.size}-${i.thick}` === key
          )
          const updatedItem = { ...defaultItem, ...updates, isCustom: false }
          if (existingIndex >= 0) {
            const newItems = [...prev]
            newItems[existingIndex] = updatedItem
            return newItems
          }
          return [...prev, updatedItem]
        })
      }
    } else {
      setCustomItems(prev =>
        prev.map(item => (item.id === id ? { ...item, ...updates } : item))
      )
    }
  }, [items])

  const deleteItem = useCallback((id: string) => {
    if (id.startsWith('default-')) {
      // Can't delete default items, but we can reset any overrides
      const item = items.find(i => i.id === id)
      if (item) {
        setCustomItems(prev =>
          prev.filter(i => {
            if (i.isCustom) return true
            const key = `${i.type}-${i.size}-${i.thick}`
            const itemKey = `${item.type}-${item.size}-${item.thick}`
            return key !== itemKey
          })
        )
      }
      return false // Indicates it was reset, not deleted
    }
    setCustomItems(prev => prev.filter(item => item.id !== id))
    return true
  }, [items])

  const exportItems = useCallback(() => {
    return JSON.stringify(items, null, 2)
  }, [items])

  const importItems = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      if (!Array.isArray(parsed)) {
        throw new Error('Invalid format: expected array')
      }
      
      // Validate and transform imported items
      const validItems: CustomItem[] = parsed.map((item: Item, index: number) => {
        if (!item.type || !item.size || !item.thick || 
            typeof item.wtpc !== 'number' || typeof item.diff !== 'number') {
          throw new Error(`Invalid item at index ${index}`)
        }
        return {
          ...item,
          id: item.id || generateId(),
          isCustom: true,
        }
      })
      
      setCustomItems(validItems.filter(i => i.isCustom))
      return { success: true, count: validItems.length }
    } catch (e) {
      return { success: false, error: (e as Error).message }
    }
  }, [])

  const resetToDefaults = useCallback(() => {
    setCustomItems([])
  }, [])

  return {
    items,
    customItems,
    isLoaded,
    addItem,
    updateItem,
    deleteItem,
    exportItems,
    importItems,
    resetToDefaults,
  }
}
