'use client'

import Image from 'next/image'
import { Section } from './section'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Settings, QuoteLine } from '@/lib/pricing'
import { calculateLine, calculateSummary, formatINR, formatINRInt, formatNumber } from '@/lib/pricing'
import { Printer, Trash2, X, FileText } from 'lucide-react'

interface QuotationSectionProps {
  settings: Settings
  lines: QuoteLine[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function QuotationSection({ settings, lines, onRemove, onClear }: QuotationSectionProps) {
  const summary = calculateSummary(lines, settings)
  const termText =
    settings.termAdj === 0
      ? '7 days'
      : settings.termAdj === 500
        ? '25 days'
        : 'Next day'

  const handlePrint = () => {
    window.print()
  }

  return (
    <Section
      number={3}
      title="Quotation"
      subtitle="Stock deducted in kg automatically"
    >
      {lines.length > 0 && (
        <div className="mb-4 flex gap-2 print:hidden">
          <Button variant="default" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </Button>
          <Button variant="outline" onClick={onClear} className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
            Clear all
          </Button>
        </div>
      )}

      {lines.length === 0 ? (
        <EmptyState />
      ) : (
        <>
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
                className="object-contain mb-1"
              />
            </div>
          </div>

          <div className="border mt-3 text-xs">
            <div className="grid grid-cols-2 p-2">
                <p><b>Date:</b> {new Date().toLocaleDateString('en-GB')}</p>
                <p><b>Quote No:</b> {settings.quotationNo}</p>
            </div>
          </div>

          {/* CUSTOMER */}
          <div className="border mt-3 text-xs">
            <div className="bg-gray-100 p-1 font-semibold text-start">
              Customer Details
            </div>

            <div className="grid grid-cols-2 p-2">
              <div>
                <p><b>Name:</b> {settings.customerName}</p>
                <p><b>Address:</b> {settings.address}</p>
              </div>

              <div>
                <p><b>Enquiry:</b> {settings.enquiryType}</p>
                <p><b>GST:</b> {settings.gstNo}</p>
              </div>

              <div className="mt-2">
                <p><b>Kindly Attn:</b></p>
                <p>Name: {settings.kindlyName}</p>
                <p>Phone: {settings.kindlyPhone}</p>
              </div>

              <div className="mt-2">
                <p><b>Reference:</b></p>
                <p>Name: {settings.referenceName}</p>
                <p>Phone: {settings.referencePhone}</p>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <table className="w-full border mt-3 text-[11px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-1 w-[25px] text-center">No.</th>
                <th className="border p-1 text-left w-[90px]">Item</th>
                <th className="border p-1">Thick</th>
                <th className="border p-1">Qty</th>
                <th className="border p-1">WT/PC</th>
                <th className="border p-1">Total KG</th>
                <th className="border p-1">MT Rate</th>
                <th className="border p-1">Rate/PC</th>
                <th className="border p-1">Amount</th>
                <th className="border p-1">GST</th>
                <th className="border p-1">Total</th>
              </tr>
            </thead>

            <tbody>
              {lines.map((line, index) => {
                const calc = calculateLine(line, settings)

                return (
                  <tr key={line.id}>
                    <td className="border p-1 text-center">
                      {index + 1}
                    </td>

                    <td className="border p-1 w-[90px]">
                      {line.item.category === 'sheet'
                        ? `${line.item.type} ${line.item.height}x${line.item.width}`
                        : `${line.item.type} ${line.item.size}`}
                    </td>

                    <td className="border p-1 text-center">
                      {line.item.thick}
                    </td>

                    <td className="border p-1 text-center">
                      {line.qty}
                    </td>

                    <td className="border p-1 text-center">
                      {line.item.wtpc} kg
                    </td>

                    <td className="border p-1 text-center">
                      {calc.totalKg} kg
                    </td>

                    <td className="border p-1 text-center">
                      ₹{formatNumber(calc.effectiveMT)}/MT
                    </td>

                    <td className="border p-1 text-center">
                      {formatINR(calc.ratePerPc)}
                    </td>

                    <td className="border p-1 text-center">
                      {formatINR(calc.lineAmount)}
                    </td>

                    <td className="border p-1 text-center">
                      {formatINR(calc.gstAmount)}
                    </td>

                    <td className="border p-1 text-right">
                      {formatINR(calc.lineTotal)}
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
              <span>GST @ {settings.gstPct}%</span>
              <span>{formatINRInt(summary.totalGst)}</span>
            </div>

            <div className="flex justify-between border-b px-2 py-1">
              <span>Loading (₹350/MT)</span>
              <span>{formatINRInt(summary.loading)}</span>
            </div>

            <div className="flex justify-between font-bold px-2 py-1">
              <span>Total</span>
              <span>{formatINRInt(summary.grandTotal)}</span>
            </div>

          </div>

        </div>

          {/* TERMS */}
          <div className="mt-4 border-t pt-2 text-[10px]">
            <b>Terms & Conditions:</b><br />
            Payment within 7 days. Material rates may vary.
          </div>
        </div>

        {/* <div className="mb-4 flex items-center justify-between"> */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <div className="flex items-center gap-3">
            <Image
              src="/surya_logo.png"
              alt="Surya Profile"
              width={70}
              height={70}
              className="object-contain"
            />

            <div>
              <h2 className="text-base sm:text-xl font-bold uppercase leading-tight">
                Surya Profile Industries
              </h2>

              <p className="text-sm text-muted-foreground">
                Quotation
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-sm">
            <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
            <p><strong>Quotation:</strong> {settings.quotationNo}</p>
          </div>
        </div>

        <div className="mb-4 text-sm border rounded-md p-2 bg-muted/30 print:hidden">
          <div className="grid grid-cols-2 gap-x-10 gap-y-3">
            {/* LEFT SIDE */}
            <div>
              <p><b>Customer:</b> {settings.customerName}</p>
              <p><b>Enquiry:</b> {settings.enquiryType}</p>

              <div className="mt-2">
                <p><b>Kindly Attn:</b></p>
                <p>Name: {settings.kindlyName}</p>
                <p>Phone: {settings.kindlyPhone}</p>
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div>
              <p><b>GST:</b> {settings.gstNo}</p>
              <p><b>Address:</b> {settings.address}</p>

              <div className="mt-2">
                <p><b>Reference:</b></p>
                <p>Name: {settings.referenceName}</p>
                <p>Phone: {settings.referencePhone}</p>
              </div>
            </div>
          </div>
        </div>



          {/* MOBILE VIEW */}
          <div className="md:hidden print:hidden space-y-3">
            {lines.map((line) => {
              const calc = calculateLine(line, settings)

              return (
                <div
                  key={line.id}
                  className="border rounded-xl p-3 bg-white shadow-sm"
                >
                  <div className="font-semibold text-sm mb-1">
                    {line.item.type}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>Thick: {line.item.thick}</div>
                    <div>Qty (Pcs): {line.qty} pcs</div>

                    <div>Wt/Pc: {line.item.wtpc} kg</div>
                    <div>Total KG: {calc.totalKg} kg</div>

                    <div>MT Rate: {calc.effectiveMT}/MT</div>
                    <div>Rate/Pc: ₹{calc.ratePerPc}</div>

                    <div>Amount: ₹{calc.lineAmount}</div>
                    <div>GST: ₹{calc.gstAmount}</div>

                    <div className="col-span-2 text-right font-semibold text-blue-600">
                      ₹{calc.lineTotal}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>



          <div className="-mx-2 hidden md:block print:block overflow-x-auto md:-mx-2 print:overflow-visible print:overflow-x-hidden print:hidden">
            {/* <Table> */}
            <Table className="w-full table-auto text-[12px] print:table-fixed">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide print:w-[140px]">Item</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Thick</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Qty (pcs)</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Wt/pc</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Total kg</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide w-[70px]">MT Rate</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Rate/pc</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Amount</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">GST</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Line Total</TableHead>
                  <TableHead className="w-10 print:hidden" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line) => {
                  const calc = calculateLine(line, settings)
                  return (
                    <TableRow key={line.id} className="group print:h-[28px] no-break">
                      <TableCell className="print:w-[140px] whitespace-normal break-words">
                        <div className="font-medium">
                          {
                            line.item.category === 'sheet'
                              ? `${line.item.type} — ${line.item.height || '-'}x${line.item.width || '-'}`
                              : `${line.item.type} — ${line.item.size}`
                          }
                          {/* {line.item.type} — {line.item.size} */}
                        </div>
                        {/* <div className="font-mono text-[11px] text-muted-foreground">
                          diff: +₹{formatNumber(line.item.diff)} · MT: ₹{formatNumber(calc.effectiveMT)}
                        </div> */}
                      </TableCell>
                      <TableCell className="font-mono text-[13px]">{line.item.thick}</TableCell>
                      <TableCell className="font-mono text-[13px] font-semibold">{line.qty} pcs</TableCell>
                      <TableCell className="font-mono text-[13px]">{line.item.wtpc} kg</TableCell>
                      <TableCell className="font-mono text-[13px] font-medium text-primary">{calc.totalKg} kg</TableCell>
                      <TableCell className="font-mono text-xs no-wrap">₹{formatNumber(calc.effectiveMT)}/MT</TableCell>
                      <TableCell className="font-mono text-[13px] no-wrap">{formatINR(calc.ratePerPc)}</TableCell>
                      <TableCell className="font-mono text-[13px] no-wrap">{formatINR(calc.lineAmount)}</TableCell>
                      <TableCell className="font-mono text-[13px]">{formatINR(calc.gstAmount)}</TableCell>
                      <TableCell className="font-mono text-[13px] font-medium no-wrap">{formatINR(calc.lineTotal)}</TableCell>
                      <TableCell className="print:hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemove(line.id)}
                          className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove line</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 print:hidden">
            <StatCard value={`${summary.totalKg.toFixed(1)} kg`} label="Total weight (stock out)" />
            <StatCard value={formatINRInt(summary.totalMat)} label="Material (ex-GST)" />
            <StatCard value={formatINRInt(summary.totalGst)} label={`GST @ ${settings.gstPct}%`} />
            <StatCard value={formatINRInt(summary.loading)} label="Loading (₹350/MT)" />
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-header px-3 py-4 text-header-foreground print:hidden">
            <div>
              <div className="text-[13px] text-muted-foreground">
                {termText} · GST {settings.gstPct}% · Loading included
              </div>
            </div>
            <div className="font-mono text-xl font-semibold text-primary sm:text-2xl">
              {formatINRInt(summary.grandTotal)}
            </div>
          </div>

          {/* <div className="mt-2.5 rounded-md bg-muted/50 px-3 py-2 font-mono text-[11px] text-muted-foreground">
            Ex Surat Godown · Loading ₹350/MT on {summary.totalKg.toFixed(1)} kg = ₹{Math.round(summary.loading).toLocaleString('en-IN')} · GST extra as applicable · Jointless +₹500/MT extra
          </div> */}

        </>
      )}
    </Section>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 py-10 text-center">
      <FileText className="mb-2 h-8 w-8 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">
        No items yet. Add items from section 2.
      </p>
    </div>
  )
}

interface StatCardProps {
  value: string
  label: string
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <div className="mb-0.5 font-mono text-lg font-medium">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  )
}
