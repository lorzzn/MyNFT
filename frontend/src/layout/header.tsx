"use client"

import Logo from "@/components/Logo"
import { twclx } from "@/utils/twclx"
import { Button, useColorMode } from "@chakra-ui/react"
import { css } from "@emotion/css"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { RiMoonFill, RiSunFill } from "@remixicon/react"
import Link from "next/link"
import { Else, If, Then } from "react-if"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div
      className={twclx(
        ["flex items-center justify-between h-14 px-6 shadow sticky top-0"],
        css`
          background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, var(--chakra-colors-chakra-body-bg) 1px);
          background-size: 4px 4px;
          backdrop-filter: blur(3px);
        `,
      )}
    >
      <Link href={"/"}>
        <Logo />
      </Link>

      <div className="flex items-center space-x-3">
        <ConnectButton />
        <Button onClick={toggleColorMode} size={"sm"} className="!h-9" borderRadius={"2xl"}>
          <If condition={colorMode === "light"}>
            <Then>
              <RiSunFill size={"1.2rem"} />
            </Then>
            <Else>
              <RiMoonFill size={"1.2rem"} />
            </Else>
          </If>
        </Button>
      </div>
    </div>
  )
}

export default Header
