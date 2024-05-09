"use client"

import abis from "@/abis"
import { Button, Card, CardBody, useToast } from "@chakra-ui/react"
import { RiHammerFill } from "@remixicon/react"
import { useEffect } from "react"
import { BaseError } from "viem"
import { useAccount, useWriteContract } from "wagmi"

const App = () => {
  const { chain } = useAccount()
  const { writeContract, isPending, error } = useWriteContract()
  const toast = useToast()

  const handleMint = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: abis.MyNFT,
      functionName: "mintNFT",
      args: [],
      chainId: chain?.id,
    })
  }

  useEffect(() => {
    if (error) {
      toast({
        title: (error as BaseError).shortMessage || error.message,
        status: "error",
      })
    }
  }, [error])

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center">
        <Card>
          <CardBody
            as={Button}
            className="aspect-square !h-36 flex-col space-y-3"
            onClick={handleMint}
            isLoading={isPending}
          >
            <RiHammerFill size={"1.2rem"} />
            <span>Mint MyNFT</span>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default App
