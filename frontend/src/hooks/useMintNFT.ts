import abis from "@/abis"
import { useEffect } from "react"
import { Config, useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi"

export type UseMintNFTReturn = {
  writeFn: ReturnType<typeof useWriteContract>
  waitFn: ReturnType<typeof useWaitForTransactionReceipt>
  writeContract: () => void
}

export default function useMintNFT({
  callbacks,
}: {
  callbacks?: {
    onSuccessWrite?: (data: any) => void
    onError?: (error: Error) => void
    onSuccessConfirm?: (data: any) => void
  }
}): UseMintNFTReturn {
  const { chain, address } = useAccount()
  console.log(chain)

  const writeFn = useWriteContract({
    mutation: {
      onSuccess: callbacks?.onSuccessWrite,
      onError: callbacks?.onError,
    },
  })

  const writeContract = () => {
    if (!!address) {
      writeFn.writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abis.MyNFT,
        functionName: "mintNFT",
        args: [],
        chainId: chain?.id,
      })
    }
  }

  const waitFn = useWaitForTransactionReceipt({
    hash: writeFn?.data,
    chainId: chain?.id,
  })

  useEffect(() => {
    if (waitFn.isSuccess) {
      callbacks?.onSuccessConfirm?.(waitFn.data)
    } else if (waitFn.isError) {
      callbacks?.onError?.(waitFn.error)
    }
  }, [waitFn.isSuccess, waitFn.isError])

  return {
    writeFn,
    waitFn,
    writeContract,
  }
}
