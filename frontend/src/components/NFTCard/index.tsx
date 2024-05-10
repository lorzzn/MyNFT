"use client"

import { MyNFT } from "@/types/my-nft"
import { Box, Button, Card, CardBody, Image } from "@chakra-ui/react"
import { motion } from "framer-motion"

type NFTCardProps = {
  data: string
}

const NFTCard = ({ data }: NFTCardProps) => {
  const json = Buffer.from(data.substring(29), "base64").toString()
  const nft = JSON.parse(json) as MyNFT

  return (
    <Card>
      <CardBody padding={0} position={"relative"} as={Button}>
        <Box>
          <Image boxSize="150px" objectFit="cover" src={nft.image} alt={nft.name} />
        </Box>
        <motion.div
          className="absolute inset-0 opacity-0 flex justify-center items-center"
          whileHover={{
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="w-full p-3 !whitespace-normal break-all text-center text-white">{nft.name}</span>
        </motion.div>
      </CardBody>
    </Card>
  )
}

export default NFTCard
