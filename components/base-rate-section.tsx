'use client'

import { Section } from './section'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Settings } from '@/lib/pricing'

interface BaseRateSectionProps {
  settings: Settings
  onUpdate: (updates: Partial<Settings>) => void
}

export function BaseRateSection({ settings, onUpdate }: BaseRateSectionProps) {
  return (
    <Section
      number={1}
      title="Today's Base Rate"
      subtitle="Set once — all prices update automatically"
      footer={<FormulaBar />}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="baseRate" className="text-xs uppercase tracking-wider text-muted-foreground">
            Base Rate (per MT) — Arihant&apos;s daily rate
          </Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              id="baseRate"
              type="number"
              value={settings.baseRate}
              onChange={(e) => onUpdate({ baseRate: Number(e.target.value) || 0 })}
              className="pl-7 font-mono text-base font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="termAdj" className="text-xs uppercase tracking-wider text-muted-foreground">
            Payment Term
          </Label>
          <Select
            value={String(settings.termAdj)}
            onValueChange={(v) => onUpdate({ termAdj: Number(v) })}
          >
            <SelectTrigger id="termAdj">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">7 days — base rate</SelectItem>
              <SelectItem value="500">25 days — +₹500/MT</SelectItem>
              <SelectItem value="-500">Next day — −₹500/MT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gstPct" className="text-xs uppercase tracking-wider text-muted-foreground">
            GST
          </Label>
          <Select
            value={String(settings.gstPct)}
            onValueChange={(v) => onUpdate({ gstPct: Number(v) })}
          >
            <SelectTrigger id="gstPct">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0% — exclude GST</SelectItem>
              <SelectItem value="18">18%</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Section>
  )
}

function FormulaBar() {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-muted bg-header px-4 py-2.5 font-mono text-xs text-primary md:px-5">
      <span className="text-header-foreground">Effective MT rate</span>
      <span className="text-muted-foreground">=</span>
      <span className="text-header-foreground">Base rate</span>
      <span className="text-muted-foreground">+</span>
      <span className="text-header-foreground">Diff</span>
      <span className="text-muted-foreground">+</span>
      <span className="text-header-foreground">Payment adj.</span>
      <span className="text-muted-foreground">→</span>
      <span className="text-header-foreground">÷ 1000 = rate/kg</span>
      <span className="text-muted-foreground">→</span>
      <span className="text-header-foreground">× wt/pc = rate/pc</span>
    </div>
  )
}
