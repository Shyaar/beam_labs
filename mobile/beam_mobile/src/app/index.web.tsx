import React, { useState, useEffect } from 'react'
import { HomeScreen } from '../components/HomeScreen'
import { SplashScreen } from '../components/onboarding/SplashScreen'
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow'
import { useUser } from '../context/UserContext'

export default function WebApp() {
  const { profile } = useUser()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Show splash for 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  if (!profile) {
    return <OnboardingFlow />
  }

  return <HomeScreen />
}
