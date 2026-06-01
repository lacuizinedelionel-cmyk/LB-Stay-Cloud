import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const RestaurantContext = createContext(null)

export function RestaurantProvider({ children }) {
  const { restaurant } = useAuth()
  const [branches, setBranches] = useState([])
  const [activeBranch, setActiveBranch] = useState(null)
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchBranches = useCallback(async () => {
    if (!restaurant?.id) return
    const { data } = await supabase
      .from('branches')
      .select('*')
      .eq('restaurant_id', restaurant.id)
      .order('name')
    if (data) {
      setBranches(data)
      if (!activeBranch && data.length > 0) setActiveBranch(data[0])
    }
  }, [restaurant?.id])

  const fetchMenu = useCallback(async () => {
    if (!restaurant?.id) return
    setLoading(true)
    try {
      const [catRes, itemRes] = await Promise.all([
        supabase.from('categories').select('*').eq('restaurant_id', restaurant.id).order('sort_order'),
        supabase.from('menu_items').select('*').eq('restaurant_id', restaurant.id).order('name'),
      ])
      if (catRes.data) setCategories(catRes.data)
      if (itemRes.data) setMenuItems(itemRes.data)
    } finally {
      setLoading(false)
    }
  }, [restaurant?.id])

  useEffect(() => {
    fetchBranches()
    fetchMenu()
  }, [fetchBranches, fetchMenu])

  return (
    <RestaurantContext.Provider value={{
      branches,
      activeBranch,
      setActiveBranch,
      categories,
      menuItems,
      loading,
      fetchBranches,
      fetchMenu,
    }}>
      {children}
    </RestaurantContext.Provider>
  )
}

export function useRestaurant() {
  const ctx = useContext(RestaurantContext)
  if (!ctx) throw new Error('useRestaurant doit être utilisé dans RestaurantProvider')
  return ctx
}
