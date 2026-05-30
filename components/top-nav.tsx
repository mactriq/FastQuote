'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  // { href: '/', label: 'Quotation' },
  { href: '/erp', label: 'Quotation' },
  { href: '/items', label: 'Items List' },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#F5F5F5] print:hidden">
      <div className="px-3">

        <div className="flex items-center justify-between h-12">

          {/* Logo */}
          <div className="font-mono text-[12px] sm:text-[14px] font-medium whitespace-nowrap">
            SURYA <span className="text-primary">PROFILE</span> INDUSTRIES
          </div>

          {/* Menu */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-2 py-1 text-[12px] sm:text-sm font-medium whitespace-nowrap',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

        </div>

      </div>
    </header>

    // <header className="sticky top-0 z-50 border-b border-border bg-card print:hidden">
    //   <div className="mx-auto w-full px-4 md:px-10">
    //     <div className="flex h-14 items-center justify-between">
    //       <div className="font-mono bg-[#D8E0E4] p-2 text-[15px] font-medium tracking-wide text-foreground">
    //         SURYA <span className="text-primary">PROFILE</span> INDUSTRIES
    //       </div>
    //       <nav className="flex items-center gap-1">
    //         {navItems.map(item => (
    //           <Link
    //             key={item.href}
    //             href={item.href}
    //             className={cn(
    //               'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
    //               pathname === item.href
    //                 ? 'bg-primary text-primary-foreground'
    //                 : 'text-muted-foreground hover:bg-accent hover:text-foreground'
    //             )}
    //           >
    //             {item.label}
    //           </Link>
    //         ))}
    //       </nav>
    //     </div>
    //   </div>
    // </header>
  )
}
