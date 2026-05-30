'use client'

import { useState } from "react"
import Image from 'next/image'
import { ITEMS } from '@/lib/items'
import { Input } from '@/components/ui/input'
import { TopNav } from '@/components/top-nav'
import type { Settings, QuoteLine } from '@/lib/pricing'
import { calculateLine, formatINRInt } from '@/lib/pricing'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { effectiveMT, ratePerKg, ratePerPc, formatNumber, formatINR, calculateSummary } from '@/lib/pricing'

interface QuotationSectionProps {
  settings: Settings
  lines: QuoteLine[]
  onRemove: (id: string) => void
  onClear: () => void
  onUpdate: (updates: Partial<Settings>) => void
}

  const formatTableNumber = (value: string | number) => {
  const num = Number(value)
  if (isNaN(num)) return value

  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function ERPPage({
  settings = {
    gstPct: 18, termAdj: 0,
    enquiryType: '',
    kindlyPhone: '',
    kindlyName: '',
    referencePhone: '',
    referenceName: '',
    phone: '',
    address: '',
    quotationNo: '',
    customerName: '',
    gstNo: '',
    baseRate: 0
  },
  lines = [],
  onUpdate = () => {}
}: Partial<QuotationSectionProps>) {

    const emptyRow = {
    category: '',
    item: '',
    size: '',
    thickness: '',
    quantity: '',
    baseRate: '',
    height: '',
    width: '',
    wtpc: '',
    totalKg: '',
    mtRate: '',
    ratePc: '',
    amount: '',
    gst: '',
    lineTotal: '',
  }

  const [rows, setRows] = useState([
    {
      category: '',
      item: '',
      size: '',
      thickness: '',
      quantity: '',
      baseRate: '',
      height: '',
      width: '',
      wtpc: '',
      totalKg: '',
      mtRate: '',
      ratePc: '',
      amount: '',
      gst: '',
      lineTotal: '',
    },
  ])
  // const safeLines = lines || []
  // const safeSettings = settings || { gstPct: 18, termAdj: 0 }
  const [localSettings, setLocalSettings] = useState(settings)
  const handleUpdate = (updates: Partial<Settings>) => {
  const newSettings = {
    ...localSettings,
    ...updates,
  }

  setLocalSettings(newSettings)

  onUpdate?.(updates)

  // Recalculate all rows
  setRows((prevRows) => {
    const updatedRows = [...prevRows]

    updatedRows.forEach((row, index) => {
      if (row.quantity) {
        const selectedItem = ITEMS.find((i) => {

          if (row.item === "Rect-Square Pipe") {
            return (
              i.type === "Rect-Square Pipe" &&
              i.size === row.size &&
              i.thick === row.thickness
            )
          }

          if (row.category === "sheet") {
            return (
              i.type
                .toLowerCase()
                .includes(
                  row.item.toLowerCase().replace(" sheet", "")
                ) &&
              i.thick === row.thickness
            )
          }

          return (
            i.type === row.item &&
            i.size === row.size &&
            i.thick === row.thickness
          )
        })

        if (!selectedItem) return

        const qty = Number(row.quantity || 0)

        let wtpc = selectedItem.wtpc

        if (
          row.category === "sheet" &&
          row.height &&
          row.width &&
          row.thickness
        ) {
          wtpc =
            Number(row.height) *
            Number(row.width) *
            parseFloat(row.thickness) *
            0.283
        }

        const effectiveMT =
          Number(newSettings.baseRate || 0) +
          Number(row.baseRate || 0) +
          Number(newSettings.termAdj || 0)

        const ratePerKg = effectiveMT / 1000
        const ratePc = ratePerKg * wtpc
        const totalKg = wtpc * qty
        const amount = ratePc * qty

        const gst =
          amount *
          (Number(newSettings.gstPct || 0) / 100)

        const lineTotal = amount + gst

        updatedRows[index] = {
          ...row,
          wtpc: wtpc.toFixed(2),
          totalKg: totalKg.toFixed(2),
          mtRate: effectiveMT.toFixed(2),
          ratePc: ratePc.toFixed(2),
          amount: amount.toFixed(2),
          gst: gst.toFixed(2),
          lineTotal: lineTotal.toFixed(2),
        }
      }
    })

    return updatedRows
  })
  }

  const summary = rows
  .filter(
    (row) =>
      row.item &&
      Number(row.quantity) > 0
  )
  .reduce(
  (acc, row) => {
    acc.totalKg += Number(row.totalKg || 0)
    acc.totalMat += Number(row.amount || 0)
    acc.totalGst += Number(row.gst || 0)

    return acc
  },
    {
      totalKg: 0,
      totalMat: 0,
      totalGst: 0,
    }
  )

  const loading = Number(
    (summary.totalKg * 350 / 1000).toFixed(2)
  )

  const grandTotal = Number(
    (
      summary.totalMat +
      summary.totalGst +
      loading
    ).toFixed(2)
  )


  const termText =
  localSettings.termAdj === 0
    ? '7 days'
    : localSettings.termAdj === 500
      ? '25 days'
      : 'Next day'

  const addNewRow = () => {
    setRows([...rows, emptyRow])
  }

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index)
    setRows(updatedRows.length ? updatedRows : [emptyRow])
  }

  const updateRow = (
    index: number,
    field: string,
    value: string
  ) => {

  const updatedRows = [...rows]

  updatedRows[index] = {
    ...updatedRows[index],
    [field]: value,
  }

  // reset logic
  if (field === 'category') {
    updatedRows[index].item = ''
    updatedRows[index].size = ''
    updatedRows[index].thickness = ''
    updatedRows[index].height = ''
    updatedRows[index].width = ''
  }

  if (field === 'item') {
    updatedRows[index].size = ''
    updatedRows[index].thickness = ''
  }

  if (field === 'size') {
    updatedRows[index].thickness = ''
  }

  const row = updatedRows[index]

  const selectedItem = ITEMS.find((i) => {

  if (row.item === 'Rect-Square Pipe') {
    return (
      i.type === 'Rect-Square Pipe' &&
      i.size === row.size &&
      i.thick === row.thickness
    )
  }

  if (row.category === 'sheet') {
    return (
      i.type
        .toLowerCase()
        .includes(
          row.item
            .toLowerCase()
            .replace(' sheet', '')
        ) &&
      i.thick === row.thickness
    )
  }

  return (
    i.type === row.item &&
    i.size === row.size &&
    i.thick === row.thickness
  )
})

  if (selectedItem) {

  const qty = Number(row.quantity || 0)

  let wtpc = selectedItem.wtpc

if (
  row.category === "sheet" &&
  row.height &&
  row.width &&
  row.thickness
) {
  const h = Number(row.height)
  const w = Number(row.width)
  const t = parseFloat(row.thickness)

  wtpc = h * w * t * 0.283
}

  const rowSettings = {
    ...localSettings,
    baseRate:
      Number(localSettings.baseRate || 0) +
      Number(row.baseRate || 0),
  }

  const calcSettings = {
    ...rowSettings,
    baseRate:
      Number(localSettings.baseRate || 0) +
      Number(row.baseRate || 0),
  }

  const calc = calculateLine(
  {
    id: "1",
    item: selectedItem,
    qty: Number(row.quantity),
  },
  calcSettings
  )

  const effectiveMT =
  Number(localSettings.baseRate || 0) +
  Number(row.baseRate || 0) +
  localSettings.termAdj

const ratePerKg = effectiveMT / 1000

const ratePc = ratePerKg * wtpc

const totalKg = wtpc * qty

const amount = ratePc * qty

const gst =
  amount *
  ((localSettings.gstPct || 0) / 100)

const lineTotal = amount + gst

  updatedRows[index] = {
    ...row,

    wtpc: wtpc.toFixed(2),
    totalKg: totalKg.toFixed(2),
    mtRate: effectiveMT.toFixed(2),
    ratePc: ratePc.toFixed(2),
    amount: amount.toFixed(2),
    gst: gst.toFixed(2),
    lineTotal: lineTotal.toFixed(2),
  }
}

  setRows(updatedRows)
}

  return (
    <>
    <TopNav />
    <div className="erp-bg min-h-[calc(90vh-40px)] print:hidden">
      <div className="erp-bg p-2 md:p-4 text-xs">

        {/* HEADER */}
        <div className="inline-block px-4 font-bold text-lg uppercase text-[#ff00cc] bg-[#C9D1FF] border
            border-t-white border-l-white border-r-gray-600 border-b-gray-600 shadow-[inset_1px_1px_0_white,inset_-1px_-1px_0_gray]">
            Today's Base Rate
        </div>


        {/* FORM */}
        <div className="border border-gray-400 p-2 mt-1 space-y-2">

            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <label className="text-[#000474] font-bold uppercase whitespace-nowrap">
                  Customer Name
                </label>
                <Input
                  id="customerName"
                  type="text"
                  value={localSettings.customerName || ""}
                  onChange={(e) =>
                    handleUpdate({
                      customerName: e.target.value,
                    })
                  }
                  className="font-mono erp-input h-auto w-full rounded-none"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <label className="text-[#000474] font-bold uppercase whitespace-nowrap">
                  GST No
                </label>
                <Input
                  id="gstNo"
                  type="text"
                  value={localSettings.gstNo || ""}
                  onChange={(e) =>
                    handleUpdate({
                      gstNo: e.target.value.toUpperCase(),
                    })
                  }
                  maxLength={15}
                  className="font-mono erp-input h-auto w-full rounded-none"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <label className="text-[#000474] font-bold uppercase whitespace-nowrap">
                  Quotation No
                </label>
                <Input
                  id="quotationNo"
                  type="text"
                  value={localSettings.quotationNo || ""}
                  onChange={(e) =>
                    handleUpdate({
                      quotationNo: e.target.value,
                    })
                  }
                  className="font-mono erp-input h-auto w-full rounded-none"
                />
              </div>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <label className="text-[#000474] font-bold uppercase whitespace-nowrap">
                  Address
                </label>
                <Input
                  id="address"
                  type="text"
                  value={localSettings.address || ""}
                  onChange={(e) =>
                    handleUpdate({
                      address: e.target.value,
                    })
                  }
                  className="font-mono erp-input h-auto w-full rounded-none"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <label className="text-[#000474] font-bold uppercase whitespace-nowrap">
                      Enquiry Type
                  </label>
                  <Select
                    value={localSettings.enquiryType || ""}
                    onValueChange={(v) =>
                      handleUpdate({
                        enquiryType: v,
                      })
                    }
                  >
                    <SelectTrigger id="enquiryType" className="font-mono erp-input h-auto w-full rounded-none">
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


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">

              {/* KINDLY ATTN */}
              <div className="bg-[#AFAFFF] p-2">
                <div className="text-white font-bold text-md mb-2">
                  KINDLY ATTN
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <label className="text-[#000474] font-bold uppercase whitespace-nowrap">Name</label>
                      <Input
                        id="kindlyName"
                        type="text"
                        value={localSettings.kindlyName || ""}
                        onChange={(e) =>
                          handleUpdate({
                            kindlyName: e.target.value,
                          })
                        }
                        className="font-mono erp-input h-auto w-full rounded-none"
                      />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <label className="text-[#000474] font-bold uppercase whitespace-nowrap">Phone</label>
                      <Input
                        id="kindlyPhone"
                        type="tel"
                        value={localSettings.kindlyPhone || ""}
                        onChange={(e) =>
                          handleUpdate({
                            kindlyPhone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        maxLength={10}
                        className="font-mono erp-input h-auto w-full rounded-none"
                      />
                  </div>
                </div>
              </div>

              {/* REFERENCE */}
              <div className="bg-[#AFAFFF] p-2">
                <div className="text-white font-bold text-md mb-2">
                  REFERENCE
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <label className="text-[#000474] font-bold uppercase whitespace-nowrap">Name</label>
                    <Input
                      id="referenceName"
                      type="text"
                      value={localSettings.referenceName || ""}
                      onChange={(e) =>
                        handleUpdate({
                          referenceName: e.target.value,
                        })
                      }
                      className="font-mono erp-input h-auto w-full rounded-none"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <label className="text-[#000474] font-bold uppercase whitespace-nowrap">Phone</label>
                    <Input
                      id="referencePhone"
                      type="tel"
                      value={localSettings.referencePhone || ""}
                      onChange={(e) =>
                        handleUpdate({
                          referencePhone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      maxLength={10}
                      className="font-mono erp-input h-auto w-full rounded-none"
                    />
                  </div>
                </div>
              </div>

            </div>


            {/* Weekly Price SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <label className="text-[#000474] font-bold uppercase whitespace-nowrap">Weekly Price</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">₹</span>
                  <Input
                    id="weeklyPrice"
                    type="text"
                    value={localSettings.baseRate || ""}
                    onChange={(e) => handleUpdate({ baseRate: Number(e.target.value) || 0 })}
                    className="pl-7 font-mono erp-input h-auto w-full rounded-none"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <label className="text-[#000474] font-bold uppercase whitespace-nowrap">Payment Term</label>
                <Select
                    value={String(localSettings.termAdj)}
                    onValueChange={(v) => handleUpdate({ termAdj: Number(v) })}
                    >
                    <SelectTrigger id="termAdj" className="font-mono erp-input h-auto w-full rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">7 days — base rate</SelectItem>
                      <SelectItem value="500">25 days — +₹500/MT</SelectItem>
                      <SelectItem value="-500">Next day — −₹500/MT</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <label className="text-[#000474] font-bold uppercase whitespace-nowrap">GST</label>
                  <Select
                    value={String(localSettings.gstPct)}
                    onValueChange={(v) => handleUpdate({ gstPct: Number(v) })}
                  >
                    <SelectTrigger id="gstPct" className="font-mono erp-input h-auto w-full rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% — exclude GST</SelectItem>
                      <SelectItem value="18">18%</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>

        </div>

        {/* TABLE */}
        <div className="bg-[#E6FFFF] mt-1 overflow-x-auto overflow-y-auto max-h-[55vh] md:max-h-[390px]">

          <table className="min-w-[1400px] w-full border-collapse text-xs">
            <thead className="bg-[#DCE4E8] sticky top-0 z-20">
              <tr>
                <th className="border border-[#A9BFC1] uppercase p-1">No</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Category</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Item</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Size</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Thickness</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Quantity</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Base Rate</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Wt/Pc</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Total Kg</th>
                <th className="border border-[#A9BFC1] uppercase p-1">MT Rate</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Rate/Pc</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Amount</th>
                <th className="border border-[#A9BFC1] uppercase p-1">GST</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Line Total</th>
                <th className="border border-[#A9BFC1] uppercase p-1">Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row: any, i) => {

              const sizes = row.item
                ? [
                    ...new Set(
                      ITEMS
                        .filter((x) => {

                          if (row.item === 'Rect-Square Pipe') {
                            return x.type === 'Rect-Square Pipe'
                          }

                          return x.type === row.item
                        })
                        .map((x) => x.size)
                    ),
                  ]
                : []

              const thicknesses =
                row.item
                  ? [
                      ...new Set(
                        ITEMS
                          .filter((x) => {

                            if (row.item === 'Rect-Square Pipe') {
                              return (
                                x.type === 'Rect-Square Pipe' &&
                                x.size === row.size
                              )
                            }

                            if (row.category === "sheet") {
                              return x.type === row.item
                            }

                            return (
                              x.type === row.item &&
                              x.size === row.size
                            )
                          })
                          .map((x) => x.thick)
                      ),
                    ]
                  : []

              return (
                <tr key={i}>

                  {/* NO */}
                  <td className="border border-[#A9BFC1] text-center">
                    {i + 1}
                  </td>

                  {/* CATEGORY */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Select
                      value={row.category}
                      onValueChange={(v) =>
                        updateRow(i, 'category', v)
                      }
                    >
                      <SelectTrigger className="h-auto border-0 rounded-none text-[11px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="semi-coil">
                          Semi-Coil
                        </SelectItem>

                        <SelectItem value="sheet">
                          Sheet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>

                  {/* ITEM */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Select
                      value={row.item}
                      onValueChange={(v) =>
                        updateRow(i, 'item', v)
                      }
                    >
                      <SelectTrigger className="h-auto border-0 rounded-none text-[11px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent>

                        {row.category === 'semi-coil' && (
                          <>
                            <SelectItem value="Rect-Square Pipe">
                              Rect-Square Pipe
                            </SelectItem>

                            <SelectItem value="Round pipe">
                              Round Pipe
                            </SelectItem>
                          </>
                        )}

                        {row.category === 'sheet' && (
                          <>
                            <SelectItem value="Metal Sheet">
                              Metal Sheet
                            </SelectItem>

                            <SelectItem value="GI Sheet">
                              GI Sheet
                            </SelectItem>

                            <SelectItem value="Color Sheet">
                              Color Sheet
                            </SelectItem>
                          </>
                        )}

                      </SelectContent>
                    </Select>
                  </td>

                  {/* SIZE */}
                  <td className="border border-[#A9BFC1] p-0">
                    {row.category === "sheet" ? (
                      <div className="flex gap-1 p-1">
                        <div className="relative flex-1">
                          <Input
                            type="text"
                            step="0.01"
                            placeholder="Height"
                            value={row.height}
                            onChange={(e) =>
                              updateRow(i, "height", e.target.value)
                            }
                            className="h-8 pr-2 text-center"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">ft</span>
                        </div>

                        <div className="relative flex-1">
                          <Input
                            type="text"
                            step="0.01"
                            placeholder="Width"
                            value={row.width}
                            onChange={(e) =>
                              updateRow(i, "width", e.target.value)
                            }
                            className="h-8 pr-2 text-center"
                          />
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">ft</span>
                        </div>
                      </div>
                    ) : (
                      <Select
                        value={row.size}
                        onValueChange={(v) =>
                          updateRow(i, "size", v)
                        }
                      >
                        <SelectTrigger className="h-auto border-0 rounded-none text-[11px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent>
                          {sizes.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </td>

                  {/* THICKNESS */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Select
                      value={row.thickness}
                      onValueChange={(v) =>
                        updateRow(i, 'thickness', v)
                      }
                      disabled={
                        row.category === "sheet"
                          ? !row.item
                          : !row.size
                      }
                    >
                      <SelectTrigger className="h-auto border-0 rounded-none text-[11px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent>
                        {thicknesses.map((t) => (
                          <SelectItem
                            key={t}
                            value={t}
                          >
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* QUANTITY */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      type="text"
                      value={row.quantity}
                      onChange={(e) =>
                        updateRow(i, 'quantity', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* BASE RATE */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      type="text"
                      value={row.baseRate}
                      onChange={(e) =>
                        updateRow(i, 'baseRate', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* WT/PC */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      readOnly
                      value={formatTableNumber(row.wtpc)}
                      onChange={(e) =>
                        updateRow(i, 'wtpc', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* TOTAL KG */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      readOnly
                      // value={row.totalKg}
                      value={formatTableNumber(row.totalKg)}
                      onChange={(e) =>
                        updateRow(i, 'totalKg', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* MT RATE */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      readOnly
                      value={formatTableNumber(row.mtRate)}
                      onChange={(e) =>
                        updateRow(i, 'mtRate', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* RATE/PC */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      readOnly
                      value={formatTableNumber(row.ratePc)}
                      onChange={(e) =>
                        updateRow(i, 'ratePc', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* AMOUNT */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      readOnly
                      value={formatTableNumber(row.amount)}
                      onChange={(e) =>
                        updateRow(i, 'amount', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* GST */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      readOnly
                      value={formatTableNumber(row.gst)}
                      onChange={(e) =>
                        updateRow(i, 'gst', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* LINE TOTAL */}
                  <td className="border border-[#A9BFC1] p-0">
                    <Input
                      readOnly
                      value={formatTableNumber(row.lineTotal)}
                      onChange={(e) =>
                        updateRow(i, 'lineTotal', e.target.value)
                      }
                      className="h-auto border-0 rounded-none text-[11px] text-center"
                    />
                  </td>

                  {/* ACTION */}
                  <td className="border border-[#A9BFC1] text-center">
                    <button
                      onClick={() => removeRow(i)}
                      className="text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </td>

                </tr>
                )
            })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-2 mt-2">
          <button onClick={addNewRow} className="bg-[#1C69E3] text-white px-3 py-1">ADD NEW</button>
        </div>
      </div>

      {/* FOOTER SECTION*/}
      <div className="md:fixed sticky bottom-0 left-0 w-full z-50 print:hidden">

        {/* TOP SUMMARY BOXES */}
        <div className="bg-[#f5f5f5] px-2 md:px-4 py-2 border-t">
          <div className="flex flex-col lg:flex-row justify-between gap-2">

            {/* LEFT SIDE (4 boxes) */}
            <div className="grid grid-cols-2 md:flex gap-2 md:gap-3">
              <div className="bg-white border min-w-[160px]">
                <StatCard value={`${summary.totalKg.toFixed(1)} kg`} label="Total weight (stock out)" />
              </div>
              <div className="bg-white border min-w-[160px]">
                 <StatCard value={formatINRInt(summary.totalMat)} label="Material (ex-GST)" />
              </div>
              <div className="bg-white border min-w-[160px]">
                <StatCard value={formatINRInt(summary.totalGst)} label={`GST @ ${localSettings.gstPct}%`} />
              </div>
              <div className="bg-white border min-w-[160px]">
                <StatCard value={formatINRInt(loading)} label="Loading (₹350/MT)" />
              </div>
            </div>

            {/* RIGHT SIDE (PRINT + TOTAL) */}
            <div className="flex items-center gap-6">
              <button onClick={() => window.print()} className="bg-[#1C69E3] text-white px-4 py-1 text-sm font-medium">Print / Save PDF</button>
              <div className="text-2xl font-bold text-[#1C69E3]">{formatINRInt(grandTotal)}</div>
            </div>

          </div>
        </div>

        {/* BOTTOM BLACK BAR */}
        <div className="bg-gray-300 text-black flex items-center font-bold justify-between px-2 md:px-4 py-1">
          <div className="text-sm opacity-80">{termText} · GST {localSettings.gstPct}% · Loading included</div>
        </div>

      </div>
    </div>
    {/* ================= PRINT DESIGN START ================= */}
        <div className="hidden print:flex flex-col bg-white text-black p-4 h-full">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            {/* LEFT SIDE */}
            <div>
              <h1 className="text-2xl font-bold tracking-wide">QUOTATION</h1>
              <p className="text-xs mt-1 font-medium">Surya Profile Industries</p>
              <p className="text-[10px] text-gray-500">Plot No. C-16/7 Road, No 14, Hojiwala Industrial Estate,<br/> Sachin, Surat -394230 (Guj.) INDIA</p>
              <p className="text-[10px] text-gray-500">suryasteeltubes@gmail.com</p>
              <p className="text-[10px] text-gray-500">+91 9898383273 | +91 9662078774</p>
            </div>
            {/* RIGHT SIDE */}
            <div className="flex flex-col items-end text-xs">
              <Image
                src="/surya_logo.png"
                alt="Surya Profile"
                width={120}
                height={120}
                unoptimized
                priority
                className="object-contain mb-1"
              />
            </div>
          </div>

          <div className="border mt-3 text-xs">
            <div className="grid grid-cols-2 p-2">
                <p><b>Date:</b> {new Date().toLocaleDateString('en-GB')}</p>
                <p><b>Quote No:</b> {localSettings.quotationNo}</p>
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="border mt-3 text-xs">
            <div className="bg-gray-100 p-1 font-semibold text-start">
              Customer Details
            </div>

            <div className="grid grid-cols-2 p-2">
              <div>
                <p><b>Name:</b> {localSettings.customerName}</p>
                <p><b>Address:</b> {localSettings.address}</p>
              </div>

              <div>
                <p><b>Enquiry:</b> {localSettings.enquiryType}</p>
                <p><b>GST:</b> {localSettings.gstNo}</p>
              </div>

              <div className="mt-2">
                <p><b>Kindly Attn:</b></p>
                <p>Name: {localSettings.kindlyName}</p>
                <p>Phone: {localSettings.kindlyPhone}</p>
              </div>

              <div className="mt-2">
                <p><b>Reference:</b></p>
                <p>Name: {localSettings.referenceName}</p>
                <p>Phone: {localSettings.referencePhone}</p>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <table className="w-full border mt-3 text-[11px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-1 w-[25px] text-center">No.</th>
                <th className="border p-1 text-left w-[80px]">Item</th>
                <th className="border p-1 w-[50px]">Thick</th>
                <th className="border p-1 w-[40px]">Qty</th>
                <th className="border p-1 w-[50px]">WT/PC</th>
                <th className="border p-1">Total KG</th>
                <th className="border p-1">MT Rate</th>
                <th className="border p-1">Rate/PC</th>
                <th className="border p-1">Amount</th>
                <th className="border p-1">GST</th>
                <th className="border p-1">Total</th>
              </tr>
            </thead>

            <tbody>
              {rows
              .filter(
                (row) =>
                  row.item &&
                  Number(row.quantity) > 0
              )
              .map((row, index) => {
                return (
                  <tr key={index}>
                    <td className="border p-1 text-center">
                      {index + 1}
                    </td>

                    <td className="border p-1">
                      {row.item}
                    </td>

                    <td className="border p-1 text-center">
                      {row.thickness}
                    </td>

                    <td className="border p-1 text-center">
                      {row.quantity}
                    </td>

                    <td className="border p-1 text-center">
                      {formatTableNumber(row.wtpc)}
                    </td>

                    <td className="border p-1 text-center">
                      {formatTableNumber(row.totalKg)}
                    </td>

                    <td className="border p-1 text-center">
                      ₹{formatTableNumber(row.mtRate)}
                    </td>

                    <td className="border p-1 text-center">
                      ₹{formatTableNumber(row.ratePc)}
                    </td>

                    <td className="border p-1 text-center">
                      ₹{formatTableNumber(row.amount)}
                    </td>

                    <td className="border p-1 text-center">
                      ₹{formatTableNumber(row.gst)}
                    </td>

                    <td className="border p-1 text-right">
                      ₹{formatTableNumber(row.lineTotal)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* TOTAL BOX */}
          <div className="mt-4 flex justify-between items-start">

          {/* LEFT SIDE */}
          <div>
            <p className="text-xs font-medium">
              Total weight: {summary.totalKg.toFixed(1)} kg
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-[220px] border text-xs">

            <div className="flex justify-between border-b px-2 py-1">
              <span>Subtotal</span>
              <span>{formatINRInt(summary.totalMat)}</span>
            </div>

            <div className="flex justify-between border-b px-2 py-1">
              <span>GST @ {localSettings.gstPct}%</span>
              <span>{formatINRInt(summary.totalGst)}</span>
            </div>

            <div className="flex justify-between border-b px-2 py-1">
              <span>Loading (₹350/MT)</span>
              <span>{formatINRInt(loading)}</span>
            </div>

            <div className="flex justify-between font-bold px-2 py-1">
              <span>Total</span>
              <span>{formatINRInt(grandTotal)}</span>
            </div>

          </div>

        </div>

          {/* TERMS */}
          <div className="mt-4 border-t pt-2 text-[10px]">
            <b>Terms & Conditions:</b><br />
            Payment within 7 days. Material rates may vary.
          </div>
        </div>
    </>
  )
}

interface StatCardProps {
  value: string
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="p-3">
      <div className="mb-0.5 font-mono text-lg font-medium">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  )
}