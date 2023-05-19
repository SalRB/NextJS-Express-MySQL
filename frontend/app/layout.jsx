"use client"

import { SessionProvider } from "next-auth/react";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css'
import { AppHeader } from "./components/layout/AppHeader";

// export const metadata = {
//   title: 'Título',
//   description: 'Generated by create next app'
// }

export default function RootLayout({ children, session }) {

  return (
    <html lang='en'>
      <body>
        <SessionProvider session={session}>
          <ToastContainer />
          <AppHeader />
          <div className="appContainer">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html >
  )
}