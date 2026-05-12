
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground print:hidden">
      <div className="flex h-14 items-center justify-between px-4 md:px-10">
        <div className="font-mono text-[15px] font-medium tracking-wide">
          SURYA <span className="text-primary">PROFILE</span> INDUSTRIES
        </div>
        <div className="hidden font-mono text-xs text-muted-foreground sm:block">
          Quotation Tool — Godown
        </div>
      </div>
    </header>
  )
}
