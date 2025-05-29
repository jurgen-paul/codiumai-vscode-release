import Link from "next/link"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </Link>
  )
}

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">{/* Logo */}</div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/games">Games</NavLink>
            <NavLink href="/pool">Ocean Pool</NavLink>
            <NavLink href="/reef">Reef Network</NavLink>
            <NavLink href="/exchange">Pearl Exchange</NavLink>
            <NavLink href="/sustainability">Ocean Care</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

