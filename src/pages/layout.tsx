import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
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
            <RecoilRoot>
              <Header />
              <Container w={'100%'}>
                {children}
              </Container>
            </RecoilRoot>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  )
}
