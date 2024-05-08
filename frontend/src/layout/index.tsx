import Content from "./content"
import Header from "./header"
import Providers from "./providers"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Content>{children}</Content>
      </div>
    </Providers>
  )
}

export default Layout
