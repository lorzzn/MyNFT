"use client"

import Logo from "@/components/Logo"
import { Button, useColorMode } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { RiMoonFill, RiSunFill } from "@remixicon/react"
import Link from "next/link"
import { Else, If, Then } from "react-if"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div className="flex items-center justify-between h-14 px-6 shadow">
      <Link href={"/"}>
        <Logo />
      </Link>

      <div className="flex items-center space-x-3">
        <ConnectButton />
        <Button onClick={toggleColorMode} variant={"ghost"} className="!bg-transparent">
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
