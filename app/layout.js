import './globals.css'
import "@/styles/typography.css";
import { Public_Sans } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/AntRegistry'
import { ClerkProvider } from '@clerk/nextjs'
import QueryProvider from '@/lib/QueryProvider';

const publicSans = Public_Sans({

  subsets: ["latin"],
  weight: ["400", "500", "600"]
})

export const metadata = {
  title: 'Connectify',
  description: 'Create beautiful memories',
}

export const viewPort = {

width: "device-width",
initialState: 1.0,
minimumScale: 1.0,
maximumScale: 1.0,
userScalable: "no",
}

export default function RootLayout({ children }) {
  return (
      <ClerkProvider
      appearance={{
        signIn: {
          variables: { colorPrimary: "#F9AA11"}
        },
        signUp: {
          variables: { colorPrimary: "#F9AA11"}
        }
      }}>
    <html lang="en">
      <body className={publicSans.className}>
        <QueryProvider>
          
        <StyledComponentsRegistry>

        {children}
        </StyledComponentsRegistry>
          </QueryProvider>

        </body>
    </html>
    </ClerkProvider>
  )
}
