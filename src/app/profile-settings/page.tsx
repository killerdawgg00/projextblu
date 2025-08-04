'use client'

import { ProfileSettingsPage } from '@/components/ProfileSettingsPage'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function ProfileSettings() {
  return <ProfileSettingsPage />
} 