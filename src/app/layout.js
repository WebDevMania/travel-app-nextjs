import './globals.css'

import { register } from 'swiper/element/bundle';
import { Inter } from 'next/font/google'
import { LayoutProvider } from '@/components/layoutProvider/LayoutProvider';
import Provider from '@/lib/sessionProvider';
import Toast from '@/lib/toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  register();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Toast />
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </Provider>
      </body>
    </html>
  )
}
