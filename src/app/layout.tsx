'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Header from './Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <CacheProvider>
          <ChakraProvider>
            <Header />
            <Container w={'100%'}>
              {children}
            </Container>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
