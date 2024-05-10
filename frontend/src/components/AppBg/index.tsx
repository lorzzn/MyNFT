import { Box, Image } from "@chakra-ui/react"
import bgImage from "./bg.jpg"

const AppBg = () => {
  return (
    <Box >
      <Image height={"300px"} src={bgImage.src} alt="" width={"100%"} objectFit={"cover"} />
    </Box>
  )
}

export default AppBg
