import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Startup Valuation Copilot',
  description: 'Estimate your startup’s worth with AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`body { font-family: Garamond, serif; }`}</style>
      </head>
      <body className="bg-black text-white">
        <Navbar />
        <div className="p-6 max-w-4xl mx-auto">{children}</div>
      </body>
    </html>
  )
}
