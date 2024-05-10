"use client"

import abis from "@/abis"
import NFTCard from "@/components/NFTCard"
import { Button, Card, CardBody, useToast } from "@chakra-ui/react"
import { RiHammerFill } from "@remixicon/react"
import { useEffect } from "react"
import { BaseError } from "viem"
import { useAccount, useInfiniteReadContracts, useWriteContract } from "wagmi"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`

const App = () => {
  const account = useAccount()
  const toast = useToast()
  const contractConfig = {
    address: CONTRACT_ADDRESS,
    abi: abis.MyNFT,
  } as const

  const getOwnerNFTsParams = (pageNo: bigint, pageSize: bigint) =>
    [account.address, pageNo, pageSize] as readonly [`0x${string}`, bigint, bigint]
  const nfts = useInfiniteReadContracts({
    cacheKey: `getOwnerNFTs-${account.address}`,
    contracts: (args) => [{ ...contractConfig, functionName: "getOwnerNFTs", args }],
    query: {
      enabled: !!account.address,
      initialPageParam: getOwnerNFTsParams(1n, 30n),
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        const [page] = _lastPage
        const [_, pageNo, pageSize] = lastPageParam
        if (page.error) return lastPageParam
        if (page.result.length < pageSize) {
          return null
        }
        return getOwnerNFTsParams(pageNo + 1n, pageSize)
      },
    },
  })
  const writeFn = useWriteContract({
    mutation: {
      onSuccess: () => nfts.refetch(),
    },
  })

  // @ts-ignore
  const data = (nfts.data?.pages.flatMap((page) => page.flatMap((s) => s.result)) || []) as [string, string][]

  // error dependencies
  const errorDeps = [writeFn.failureReason, nfts.failureReason]
  useEffect(() => {
    errorDeps.forEach((e) => {
      const errMsg = e ? (e as BaseError).shortMessage || (e as Error).message : ""
      if (errMsg) {
        toast({
          title: errMsg,
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
      <div className="flex flex-wrap items-center">
        {data.map((item) => item && <NFTCard data={item[1]} key={item[0]} />)}
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
