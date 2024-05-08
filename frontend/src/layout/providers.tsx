"use client"

import { useColorMode } from "@chakra-ui/react"
import { RainbowKitProvider, darkTheme, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"
import { WagmiProvider } from "wagmi"
import { arbitrum, base, localhost, mainnet, optimism, polygon, sepolia, zora } from "wagmi/chains"

const config = getDefaultConfig({
  appName: "MyNFT",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia, localhost] : []),
  ],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

const queryClient = new QueryClient()
const Providers = ({ children }: PropsWithChildren) => {
  const { colorMode } = useColorMode()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={colorMode === "light" ? lightTheme() : darkTheme()} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers
