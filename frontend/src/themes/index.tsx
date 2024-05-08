import { ThemeConfig, extendTheme } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const themes = extendTheme({ config })

export default themes
