import './globals.css'
import Cursor from '@/components/Cursor'

export const metadata = {
  title: 'JMJ Design — Portfolio',
  description: 'Portfólio de design gráfico — identidade visual, branding, UI/UX e ilustração.',
  icons: {
    icon: '/artes/logo_icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <Cursor />
        {children}
      </body>
    </html>
  )
}
