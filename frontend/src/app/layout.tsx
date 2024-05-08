import Layout from "@/layout"
import themes from "@/themes"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MyNFT",
  description: "My NFT",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode={themes.config.initialColorMode} />
        <ChakraProvider>
          <Layout>{children}</Layout>
        </ChakraProvider>
      </body>
    </html>
  )
}
