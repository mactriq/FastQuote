import { cn } from '@/lib/utils'

interface SectionProps {
  number: number
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Section({ number, title, subtitle, children, footer, className }: SectionProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
      <div className="flex items-center gap-3 bg-header px-4 py-3 text-header-foreground md:px-5">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {number}
        </div>
        <h2 className="text-sm font-medium tracking-wide">{title}</h2>
        {subtitle && (
          <span className="ml-auto hidden font-mono text-xs text-muted-foreground md:block">
            {subtitle}
          </span>
        )}
      </div>
      <div className="p-4 md:p-5">{children}</div>
      {footer}
    </div>
  )
}
