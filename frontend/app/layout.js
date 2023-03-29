'use client'

import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Título',
  description: 'Generated by create next app'
}

const links = [{
  label: "Home",
  route: "/",
}, {
  label: "Login",
  route: "/login",
}, {
  label: "Books",
  route: "/books",
}]

export default function RootLayout({ children }) {

  return (
    <html lang='en'>
      <body>
        <header>
          <nav>
            <ul>
              {links.map(({ label, route }) => {
                return <li key={route}>
                  <Link href={route}>
                    {label}
                  </Link>
                </li>
              })}
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html >
  )
}
