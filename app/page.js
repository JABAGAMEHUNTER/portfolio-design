'use client'

import { useState } from 'react'
import designs from '@/data/designs'
import DesignGrid from '@/components/DesignGrid'
import Modal from '@/components/Modal'

export default function Home() {
  const [selected, setSelected] = useState(null)

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <img
          src="/artes/logo.png"
          alt="JMJ Design"
          className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold mb-2">JMJ Design</h1>
        <p className="text-zinc-400 max-w-md mx-auto">
          Design gráfico com foco em identidade visual, branding, UI/UX e ilustração.
          Cada projeto é pensado para contar uma história.
        </p>
      </header>

      <DesignGrid designs={designs} onSelect={setSelected} />

      {selected && (
        <Modal design={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  )
}
