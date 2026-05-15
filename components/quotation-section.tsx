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

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/surya_logo.png"
              alt="Surya Profile"
              width={70}
              height={70}
              className="object-contain"
            />

            <div>
              <h2 className="text-xl font-bold uppercase">
                Surya Profile Industries
              </h2>

              <p className="text-sm text-muted-foreground">
                Quotation
              </p>
            </div>
          </div>

          <div className="text-right text-sm">
            <p><strong>Date:</strong> {new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
            <p><strong>Quotation:</strong> {settings.quotationNo}</p>
          </div>
        </div>

        <div className="mb-4 text-sm border rounded-md p-2 bg-muted/30">
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

          <div className="-mx-2 overflow-x-auto md:-mx-2 print:overflow-visible print:overflow-x-visible">
            {/* <Table> */}
            <Table className="print:table-fixed w-full">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide print:w-[140px]">Item</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Thick</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Qty (pcs)</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Wt/pc</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">Total kg</TableHead>
                  <TableHead className="whitespace-nowrap text-[11px] uppercase tracking-wide">MT Rate</TableHead>
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
                    <TableRow key={line.id} className="group print:h-[28px]">
                      <TableCell className="print:w-[140px] whitespace-normal break-words">
                        <div className="font-medium">
                          {line.item.type} Pipe — {line.item.size}
                        </div>
                        {/* <div className="font-mono text-[11px] text-muted-foreground">
                          diff: +₹{formatNumber(line.item.diff)} · MT: ₹{formatNumber(calc.effectiveMT)}
                        </div> */}
                      </TableCell>
                      <TableCell className="font-mono text-[13px]">{line.item.thick}</TableCell>
                      <TableCell className="font-mono text-[13px] font-semibold">{line.qty} pcs</TableCell>
                      <TableCell className="font-mono text-[13px]">{line.item.wtpc} kg</TableCell>
                      <TableCell className="font-mono text-[13px] font-medium text-primary">{calc.totalKg} kg</TableCell>
                      <TableCell className="font-mono text-xs">₹{formatNumber(calc.effectiveMT)}/MT</TableCell>
                      <TableCell className="font-mono text-[13px]">{formatINR(calc.ratePerPc)}</TableCell>
                      <TableCell className="font-mono text-[13px]">{formatINR(calc.lineAmount)}</TableCell>
                      <TableCell className="font-mono text-[13px]">{formatINR(calc.gstAmount)}</TableCell>
                      <TableCell className="font-mono text-[13px] font-medium">{formatINR(calc.lineTotal)}</TableCell>
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

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <StatCard value={`${summary.totalKg.toFixed(1)} kg`} label="Total weight (stock out)" />
            <StatCard value={formatINRInt(summary.totalMat)} label="Material (ex-GST)" />
            <StatCard value={formatINRInt(summary.totalGst)} label={`GST @ ${settings.gstPct}%`} />
            <StatCard value={formatINRInt(summary.loading)} label="Loading (₹350/MT)" />
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-header px-3 py-4 text-header-foreground">
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
