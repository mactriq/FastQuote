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
          <Label htmlFor="customerName" className="text-xs uppercase tracking-wider text-muted-foreground">
            Customer Name
          </Label>
          <div className="relative">
            <Input
              id="customerName"
              type="text"
              value={settings.customerName || ""}
              onChange={(e) =>
                onUpdate({
                  customerName: e.target.value,
                })
              }
              className="font-mono text-base font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="gstNo" className="text-xs uppercase tracking-wider text-muted-foreground">
            GST No
          </Label>
          <div className="relative">
            <Input
              id="gstNo"
              type="text"
              // value={settings.baseRate}
              value={settings.gstNo || ""}
              onChange={(e) =>
                onUpdate({
                  gstNo: e.target.value.toUpperCase(),
                })
              }
              maxLength={15}
              className="font-mono text-base font-medium uppercase"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="quotationNo" className="text-xs uppercase tracking-wider text-muted-foreground">
            Quotation No
          </Label>
          <div className="relative">
            <Input
              id="quotationNo"
              type="text"
              value={settings.quotationNo || ""}
              onChange={(e) =>
                onUpdate({
                  quotationNo: e.target.value,
                })
              }
              className="font-mono text-base font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="address" className="text-xs uppercase tracking-wider text-muted-foreground">
            Address
          </Label>
          <div className="relative">
            <Input
              id="address"
              type="text"
              value={settings.address || ""}
              onChange={(e) =>
                onUpdate({
                  address: e.target.value,
                })
              }
              className="font-mono text-base font-medium"
            />
          </div>
        </div>

        {/* <div className="space-y-1.5">
          <Label htmlFor="baseRate" className="text-xs uppercase tracking-wider text-muted-foreground">
            Reference No
          </Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              id="refNo"
              type="number"
              value={settings.baseRate}
              onChange={(e) => onUpdate({ baseRate: Number(e.target.value) || 0 })}
              className="pl-7 font-mono text-base font-medium"
            />
          </div>
        </div> */}

        {/* <div className="space-y-1.5">
          <Label htmlFor="enquiryType" className="text-xs uppercase tracking-wider text-muted-foreground">
            Enquiry Type
          </Label>
          <select
            id="enquiryType"
            value={settings.enquiryType || ""}
            onChange={(e) =>
              onUpdate({
                enquiryType: e.target.value,
              })
            }
            className="w-full rounded-md border px-3 py-1.5 text-base font-medium font-mono focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" className="readonly">Select Type</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="call">Call</option>
          </select>
        </div> */}

        <div className="space-y-1.5">
          <Label htmlFor="enquiryType" className="text-xs uppercase tracking-wider text-muted-foreground">
            Enquiry Type
          </Label>

          <Select
            value={settings.enquiryType || ""}
            onValueChange={(v) =>
              onUpdate({
                enquiryType: v,
              })
            }
          >
            <SelectTrigger id="enquiryType">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="call">Call</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md p-2 mt-5 mb-5">
        <div className="space-y-1.5 flex justify-start p-2 bg-header rounded-md mb-2">
          <Label htmlFor="kindlyAttn" className="text-xs uppercase tracking-wider text-header-foreground">
            Kindly Attn
          </Label>
        </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="kindlyName" className="text-xs uppercase tracking-wider text-muted-foreground">
            Name
          </Label>
          <div className="relative">
            <Input
              id="kindlyName"
              type="text"
              value={settings.kindlyName || ""}
              onChange={(e) =>
                onUpdate({
                  kindlyName: e.target.value,
                })
              }
              className="font-mono text-base font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="kindlyPhone" className="text-xs uppercase tracking-wider text-muted-foreground">
            Phone
          </Label>
          <div className="relative">
            <Input
              id="kindlyPhone"
              type="tel"
              value={settings.kindlyPhone || ""}
              onChange={(e) =>
                onUpdate({
                  kindlyPhone: e.target.value.replace(/\D/g, ""),
                })
              }
              maxLength={10}
              className="font-mono text-base font-medium"
            />
          </div>
        </div>
      </div>

        <div className="space-y-1.5 flex justify-start p-2 bg-header rounded-md mt-5 mb-2">
          <Label htmlFor="Reference" className="text-xs uppercase tracking-wider text-header-foreground">
            Reference
          </Label>
        </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="referenceName" className="text-xs uppercase tracking-wider text-muted-foreground">
            Name
          </Label>
          <div className="relative">
            <Input
              id="referenceName"
              type="text"
              value={settings.referenceName || ""}
              onChange={(e) =>
                onUpdate({
                  referenceName: e.target.value,
                })
              }
              className="font-mono text-base font-medium"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="referencePhone" className="text-xs uppercase tracking-wider text-muted-foreground">
            Phone
          </Label>
          <div className="relative">
            <Input
              id="referencePhone"
              type="tel"
              value={settings.referencePhone || ""}
              onChange={(e) =>
                onUpdate({
                  referencePhone: e.target.value.replace(/\D/g, ""),
                })
              }
              maxLength={10}
              className="font-mono text-base font-medium"
            />
          </div>
        </div>
      </div>
      </div>

        {/* <div className="space-y-1.5">
          <Label htmlFor="baseRate" className="text-xs uppercase tracking-wider text-muted-foreground">
            Kindly Attn
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
          <Label htmlFor="baseRate" className="text-xs uppercase tracking-wider text-muted-foreground">
            Reference Name
          </Label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              id="referenceName"
              type="number"
              value={settings.baseRate}
              onChange={(e) => onUpdate({ baseRate: Number(e.target.value) || 0 })}
              className="pl-7 font-mono text-base font-medium"
            />
          </div>
        </div> */}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

        <div className="space-y-1.5">
          <Label htmlFor="baseRate" className="text-xs uppercase tracking-wider text-muted-foreground">
            Base Rate (per MT) — Surya&apos;s daily rate
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
