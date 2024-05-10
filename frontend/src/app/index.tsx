"use client"

import abis from "@/abis"
import NFTCard from "@/components/NFTCard"
import { Button, Text, useToast } from "@chakra-ui/react"
import { RiHammerFill } from "@remixicon/react"
import { useEffect } from "react"
import { Else, If, Then, When } from "react-if"
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
      onSuccess: (data) => {
        toast({
          title: "Mint Success",
          description: `NFT Minted: ${data}`,
          status: "success",
          duration: 1600,
        })
        nfts.refetch()
      },
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
    <If condition={!!account.address}>
      <Then>
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <Text fontSize={"2xl"} fontWeight={"medium"} className="py-6">
              <span>NFT List</span>
              <When condition={data.length === 0}>
                <span className="text-gray-400 text-base ml-2">(No items.)</span>
              </When>
            </Text>

            <Button isLoading={writeFn.isPending} onClick={handleMint} className="space-x-3">
              <RiHammerFill size={"1.2rem"} />
              <span>Mint MyNFT</span>
            </Button>
          </div>
          <div className="flex flex-wrap items-center">
            {data.map((item) => item && <NFTCard data={item[1]} key={item[0]} />)}
          </div>
        </div>
      </Then>

      <Else>
        <div className="flex flex-1 items-center justify-center">
          <Text fontSize={"xl"} fontWeight={"medium"}>
            Please connect wallet.
          </Text>
        </div>
      </Else>
    </If>
  )
}

export default App
