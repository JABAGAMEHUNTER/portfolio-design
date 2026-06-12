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
        <a
          href="https://www.instagram.com/judavidal/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          @judavidal
        </a>

        <a
          href="/artes/curriculo/curriculo_designer.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 rounded-full text-xs transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Currículo
        </a>
      </header>

      <DesignGrid designs={designs} onSelect={setSelected} />

      {selected && (
        <Modal design={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  )
}
