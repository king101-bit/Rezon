'use client'

import TrendingMovies from '@/components/TrendingMovies'
import { useEffect } from 'react'

export default function HomePage() {

  return (
    <main className="min-h-screen px-4 py-10 bg-white text-black">
<TrendingMovies/>
    </main>
  )
}
