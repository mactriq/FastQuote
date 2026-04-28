'use client'

import { useState, useMemo } from 'react'
import { Section } from './section'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Item } from '@/lib/items'
import { getTypes, getSizesForType, getThicknessesForTypeAndSize, findItem, ITEMS } from '@/lib/items'
import { useItemsStore } from '@/hooks/use-items-store'
import type { Settings } from '@/lib/pricing'
import { effectiveMT, ratePerKg, ratePerPc, formatINR, formatNumber } from '@/lib/pricing'
import { ArrowRight } from 'lucide-react'

interface AddItemSectionProps {
  settings: Settings
  onAdd: (item: Item, qty: number) => void
}

export function AddItemSection({ settings, onAdd }: AddItemSectionProps) {
  const [type, setType] = useState<Item['type'] | ''>('')
  const [size, setSize] = useState('')
  const [thick, setThick] = useState('')
  const [qty, setQty] = useState('')

  const { customItems, isLoaded } = useItemsStore()
  
  // Combine default items with custom items
  const allItems = useMemo(() => {
    if (!isLoaded) return ITEMS
    return [...ITEMS, ...customItems]
  }, [customItems, isLoaded])

  const types = useMemo(() => {
    const typeSet = new Set(allItems.map((i) => i.type))
    return Array.from(typeSet).sort()
  }, [allItems])
  
  const sizes = useMemo(() => {
    if (!type) return []
    const sizeSet = new Set(allItems.filter((i) => i.type === type).map((i) => i.size))
    return Array.from(sizeSet).sort()
  }, [type, allItems])
  
  const thicknesses = useMemo(() => {
    if (!type || !size) return []
    const thickSet = new Set(
      allItems.filter((i) => i.type === type && i.size === size).map((i) => i.thick)
    )
    return Array.from(thickSet).sort()
  }, [type, size, allItems])

  const selectedItem = useMemo(() => {
    if (!type || !size || !thick) return undefined
    return allItems.find((i) => i.type === type && i.size === size && i.thick === thick)
  }, [type, size, thick, allItems])

  const qtyNum = Number(qty) || 0

  const handleTypeChange = (value: string) => {
    setType(value as Item['type'])
    setSize('')
    setThick('')
  }

  const handleSizeChange = (value: string) => {
    setSize(value)
    setThick('')
  }

  const handleAdd = () => {
    if (!selectedItem || qtyNum < 1) {
      return
    }
    onAdd(selectedItem, qtyNum)
    setQty('')
  }

  return (
    <Section
      number={2}
      title="Add Item to Quotation"
      subtitle="Select item → enter qty in pcs"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="pipeType" className="text-xs uppercase tracking-wider text-muted-foreground">
            Pipe Type
          </Label>
          <Select value={type} onValueChange={handleTypeChange}>
            <SelectTrigger id="pipeType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t} pipe
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pipeSize" className="text-xs uppercase tracking-wider text-muted-foreground">
            Size
          </Label>
          <Select value={size} onValueChange={handleSizeChange} disabled={!type}>
            <SelectTrigger id="pipeSize">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizes.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pipeThick" className="text-xs uppercase tracking-wider text-muted-foreground">
            Thickness
          </Label>
          <Select value={thick} onValueChange={setThick} disabled={!size}>
            <SelectTrigger id="pipeThick">
              <SelectValue placeholder="Select thickness" />
            </SelectTrigger>
            <SelectContent>
              {thicknesses.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-3 max-w-xs space-y-1.5">
        <Label htmlFor="qty" className="text-xs uppercase tracking-wider text-muted-foreground">
          Quantity (pcs / units)
        </Label>
        <Input
          id="qty"
          type="number"
          min="1"
          placeholder="0"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="font-mono text-base font-medium"
        />
      </div>

      {selectedItem && <PricePreview item={selectedItem} settings={settings} qty={qtyNum} />}

      <Button
        onClick={handleAdd}
        disabled={!selectedItem || qtyNum < 1}
        className="mt-4 gap-2"
      >
        Add to Quotation
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Section>
  )
}

interface PricePreviewProps {
  item: Item
  settings: Settings
  qty: number
}

function PricePreview({ item, settings, qty }: PricePreviewProps) {
  const mt = effectiveMT(item, settings)
  const rkg = ratePerKg(item, settings)
  const rpc = ratePerPc(item, settings)
  const totalKg = Number((item.wtpc * qty).toFixed(2))
  const lineMat = Number((rpc * qty).toFixed(2))

  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
      <div className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Price breakdown
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <PreviewItem label="Base rate" value={`₹${formatNumber(settings.baseRate)}/MT`} />
        <PreviewItem label="+ Diff (this item)" value={`+₹${formatNumber(item.diff)}`} highlight />
        <PreviewItem label="= Effective MT rate" value={`₹${formatNumber(mt)}/MT`} highlight />
        <PreviewItem label="Wt per pc" value={`${item.wtpc} kg`} />
      </div>
      <hr className="my-3 border-border" />
      {qty > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <PreviewItem label="Rate per kg" value={formatINR(rkg)} />
          <PreviewItem label="Rate per pc" value={formatINR(rpc)} />
          <PreviewItem label={`Total weight (${qty} pcs)`} value={`${totalKg} kg`} highlight />
          <PreviewItem label="Amount (ex-GST)" value={formatINR(lineMat)} highlight />
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Enter quantity above to see amount</p>
      )}
    </div>
  )
}

interface PreviewItemProps {
  label: string
  value: string
  highlight?: boolean
}

function PreviewItem({ label, value, highlight }: PreviewItemProps) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={`font-mono text-[15px] font-medium ${highlight ? 'text-primary' : ''}`}>
        {value}
      </div>
    </div>
  )
}
