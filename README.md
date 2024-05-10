# This is a nft demo project

this project inclide frontend and contracts.
> This is just a demo, so I only enabled sepolia for the production mode, and there will be an extra localhost for the development mode.

# frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## development

`yarn install` then `yarn dev`

## environment Variables

|key|description|
|---|-----------|
|NEXT_PUBLIC_ENABLE_TESTNETS| Whether to enable the testnets, `true` \| `false` |
|NEXT_PUBLIC_WC_PROJECT_ID| WalletConnect Cloud projectId, see [configure](https://www.rainbowkit.com/docs/installation#configure)|
|NEXT_PUBLIC_CONTRACT_ADDRESS| Contract depolyed address |

# Contract

This is a [hardhat](https://hardhat.org/) project.

## development

run `yarn install` first.

`yarn hh:node`: run a hardhat localhost node.

`yarn hh:deploy-localhost`: deploy contract to localhost.

`yarn hh:deploy-sepolia`: deploy contract to sepolia.

## environment Variables

|key|description|
|---|-----------|
|INFURA_API_KEY_URL| https://sepolia.infura.io/v3/`infura API Keys` |
|SEPOLIA_PRIVATE_KEY| Your account private key, see [deploying-to-a-live-network](https://hardhat.org/tutorial/deploying-to-a-live-network) |
