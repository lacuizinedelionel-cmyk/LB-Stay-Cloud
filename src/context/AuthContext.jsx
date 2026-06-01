import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

const DEMO_PROFILE = {
  id: 'demo-user-001',
  full_name: 'Jean Kamga',
  email: 'demo@lbcloud.cm',
  role: 'admin',
  phone: '+237 6 99 00 00 00',
}

const DEMO_RESTAURANT = {
  id: 'demo-resto-001',
  name: 'Restaurant Chez Mama',
  city: 'Douala',
  address: 'Rue de la Joie, Akwa, Douala',
  plan: 'pro',
}

function getInitialDemoState() {
  if (typeof window !== 'undefined' && sessionStorage.getItem('lb_demo_mode') === 'true') {
    return {
      user: { id: DEMO_PROFILE.id, email: DEMO_PROFILE.email, user_metadata: { role: 'admin' } },
      profile: DEMO_PROFILE,
      restaurant: DEMO_RESTAURANT,
      isDemo: true,
      loading: false,
    }
  }
  return { user: null, profile: null, restaurant: null, isDemo: false, loading: true }
}

export function AuthProvider({ children }) {
  const initial = getInitialDemoState()
  const [user, setUser] = useState(initial.user)
  const [profile, setProfile] = useState(initial.profile)
  const [restaurant, setRestaurant] = useState(initial.restaurant)
  const [loading, setLoading] = useState(initial.loading)
  const [isDemo, setIsDemo] = useState(initial.isDemo)

  useEffect(() => {
    if (isDemo) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else {
        setProfile(null)
        setRestaurant(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    try {
      const { data: prof } = await supabase
        .from('profiles')
        .select('*, restaurants(*)')
        .eq('id', userId)
        .single()

      if (prof) {
        setProfile(prof)
        setRestaurant(prof.restaurants)
      }
    } catch (err) {
      console.error('Erreur chargement profil:', err)
    } finally {
      setLoading(false)
    }
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signUp(email, password, metadata) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    })
    if (error) throw error
    return data
  }

  function signInDemo() {
    sessionStorage.setItem('lb_demo_mode', 'true')
    setUser({ id: DEMO_PROFILE.id, email: DEMO_PROFILE.email, user_metadata: { role: 'admin' } })
    setProfile(DEMO_PROFILE)
    setRestaurant(DEMO_RESTAURANT)
    setIsDemo(true)
  }

  async function signOut() {
    if (isDemo) {
      sessionStorage.removeItem('lb_demo_mode')
      setIsDemo(false)
    } else {
      await supabase.auth.signOut()
    }
    setUser(null)
    setProfile(null)
    setRestaurant(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      restaurant,
      loading,
      isDemo,
      signIn,
      signUp,
      signOut,
      signInDemo,
      fetchProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider')
  return ctx
}
