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
import { ITEMS } from '@/lib/items'
import { useItemsStore } from '@/hooks/use-items-store'

import type { Settings } from '@/lib/pricing'
import {
  effectiveMT,
  ratePerKg,
  ratePerPc,
  formatINR,
  formatNumber,
} from '@/lib/pricing'

import { ArrowRight } from 'lucide-react'

interface AddItemSectionProps {
  settings: Settings
  onAdd: (item: Item, qty: number) => void
}

export function AddItemSection({
  settings,
  onAdd,
}: AddItemSectionProps) {

  const { customItems, isLoaded } = useItemsStore()

  const allItems = useMemo(() => {
    if (!isLoaded) return ITEMS
    return [...ITEMS, ...customItems]
  }, [customItems, isLoaded])

  const types = useMemo(() => {
    const typeSet = new Set(allItems.map((i) => i.type))
    return Array.from(typeSet).sort()
  }, [allItems])

  const [items, setItems] = useState([
    {
      type: '',
      size: '',
      thick: '',
      qty: '',
    }
  ])

  const addMoreItem = () => {
    setItems([
      ...items,
      {
        type: '',
        size: '',
        thick: '',
        qty: '',
      }
    ])
  }

  const removeItem = (index: number) => {
    const updated = [...items]
    updated.splice(index, 1)
    setItems(updated)
  }

  const updateItem = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...items]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setItems(updated)
  }

  const handleAddAll = () => {

    items.forEach((entry) => {

      const foundItem = allItems.find(
        (i) =>
          i.type === entry.type &&
          i.size === entry.size &&
          i.thick === entry.thick
      )

      if (foundItem && Number(entry.qty) > 0) {
        onAdd(foundItem, Number(entry.qty))
      }
    })

    setItems([
      {
        type: '',
        size: '',
        thick: '',
        qty: '',
      }
    ])
  }

  return (
    <Section
      number={2}
      title="Add Item to Quotation"
      subtitle="Select item → enter qty in pcs"
      // className="h-full overflow-hidden"
    >
    <div className="h-[calc(95vh-100px)] overflow-y-auto pr-2">
      {items.map((entry, index) => {

        const selectedItem = allItems.find(
          (i) =>
            i.type === entry.type &&
            i.size === entry.size &&
            i.thick === entry.thick
        )

        const qtyNum = Number(entry.qty) || 0

        const sizes = entry.type
          ? [...new Set(
              allItems
                .filter((i) => i.type === entry.type)
                .map((i) => i.size)
            )]
          : []

        const thicknesses =
          entry.type && entry.size
            ? [...new Set(
                allItems
                  .filter(
                    (i) =>
                      i.type === entry.type &&
                      i.size === entry.size
                  )
                  .map((i) => i.thick)
              )]
            : []

        return (
          <div
            key={index}
            className="mb-6 rounded-xl border border-border p-4"
          >

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Item #{index + 1}
              </h3>

              {items.length > 1 && (
                <Button
                  variant="destructive"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {/* Pipe Type */}
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Pipe Type
                </Label>

                <Select
                  value={entry.type}
                  onValueChange={(value) =>
                    updateItem(index, 'type', value)
                  }
                >
                  <SelectTrigger>
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

              {/* Size */}
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Size
                </Label>

                <Select
                  value={entry.size}
                  onValueChange={(value) =>
                    updateItem(index, 'size', value)
                  }
                  disabled={!entry.type}
                >
                  <SelectTrigger>
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

              {/* Thickness */}
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                  Thickness
                </Label>

                <Select
                  value={entry.thick}
                  onValueChange={(value) =>
                    updateItem(index, 'thick', value)
                  }
                  disabled={!entry.size}
                >
                  <SelectTrigger>
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

            {/* Quantity */}
            <div className="mt-3 max-w-xs space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Quantity (pcs / units)
              </Label>

              <Input
                type="number"
                min="1"
                placeholder="0"
                value={entry.qty}
                onChange={(e) =>
                  updateItem(index, 'qty', e.target.value)
                }
                className="font-mono text-base font-medium"
              />
            </div>

            {/* Price Preview */}
            {selectedItem && (
              <PricePreview
                item={selectedItem}
                settings={settings}
                qty={qtyNum}
              />
            )}

          </div>
        )
      })}

      {/* Buttons */}
      <div className="mt-4 flex flex-wrap gap-3">

        <Button
          type="button"
          variant="outline"
          onClick={addMoreItem}
        >
          + Add More Item
        </Button>

        <Button
          onClick={handleAddAll}
          className="gap-2"
        >
          Add All To Quotation
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      </div>
    </Section>
  )
}

interface PricePreviewProps {
  item: Item
  settings: Settings
  qty: number
}

function PricePreview({
  item,
  settings,
  qty,
}: PricePreviewProps) {

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

        <PreviewItem
          label="Base rate"
          value={`₹${formatNumber(settings.baseRate)}/MT`}
        />

        <PreviewItem
          label="+ Diff (this item)"
          value={`+₹${formatNumber(item.diff)}`}
          highlight
        />

        <PreviewItem
          label="= Effective MT rate"
          value={`₹${formatNumber(mt)}/MT`}
          highlight
        />

        <PreviewItem
          label="Wt per pc"
          value={`${item.wtpc} kg`}
        />

      </div>

      <hr className="my-3 border-border" />

      {qty > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          <PreviewItem
            label="Rate per kg"
            value={formatINR(rkg)}
          />

          <PreviewItem
            label="Rate per pc"
            value={formatINR(rpc)}
          />

          <PreviewItem
            label={`Total weight (${qty} pcs)`}
            value={`${totalKg} kg`}
            highlight
          />

          <PreviewItem
            label="Amount (ex-GST)"
            value={formatINR(lineMat)}
            highlight
          />

        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Enter quantity above to see amount
        </p>
      )}

    </div>
  )
}

interface PreviewItemProps {
  label: string
  value: string
  highlight?: boolean
}

function PreviewItem({
  label,
  value,
  highlight,
}: PreviewItemProps) {

  return (
    <div>
      <div className="text-[11px] text-muted-foreground">
        {label}
      </div>

      <div
        className={`font-mono text-[15px] font-medium ${
          highlight ? 'text-primary' : ''
        }`}
      >
        {value}
      </div>
    </div>
  )
}