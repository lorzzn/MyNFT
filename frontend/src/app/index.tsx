"use client"

import abis from "@/abis"
import { Button, Card, CardBody, useToast } from "@chakra-ui/react"
import { RiHammerFill } from "@remixicon/react"
import { toString } from "lodash"
import { useEffect } from "react"
import { BaseError } from "viem"
import { useInfiniteReadContracts, useWriteContract } from "wagmi"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

const App = () => {
  const toast = useToast()
  const contractConfig = {
    address: CONTRACT_ADDRESS,
    abi: abis.MyNFT,
  } as const

  const writeFn = useWriteContract()
  const pageParam = (pageNo: bigint, pageSize: bigint) => [pageNo, pageSize] as readonly [bigint, bigint]
  const nfts = useInfiniteReadContracts({
    cacheKey: "getOwnerNFTs",
    contracts: (args) => [{ ...contractConfig, functionName: "getOwnerNFTs", args }],
    query: {
      initialPageParam: pageParam(1n, 30n),
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => pageParam(lastPageParam[0] + 1n, 30n),
    },
  })

  // error dependencies
  const errorDeps = [writeFn.failureReason, writeFn.error, nfts.failureReason, nfts.error]
  useEffect(() => {
    const getErrorMessage = (error: unknown) => error && ((error as BaseError).shortMessage || (error as Error).message)
    errorDeps.forEach((e) => {
      const errMsg = getErrorMessage(e)
      if (errMsg) {
        toast({
          title: toString(errMsg),
          status: "error",
        })
      }
    })
  }, errorDeps)

  const handleMint = () => {
    writeFn.writeContract({
      ...contractConfig,
      functionName: "mintNFT",
      args: [],
    })
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center">
        <Card>
          <CardBody
            as={Button}
            className="aspect-square !h-36 flex-col space-y-3"
            onClick={handleMint}
            isLoading={writeFn.isPending}
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
