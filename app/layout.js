import './globals.css'

export const metadata = {
  title: 'JMJ Design — Portfolio',
  description: 'Portfólio de design gráfico — identidade visual, branding, UI/UX e ilustração.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  )
}
