import dotenv from "dotenv"
dotenv.config()
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers/Providers'
import Footer from './components/Footer'


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"main"}>

        <Providers>
        {children}
        </Providers>
        <Footer/>
        </body>
    </html>
  )
}
