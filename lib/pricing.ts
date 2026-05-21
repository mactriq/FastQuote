import type { Item } from './items'

export interface Settings {
  enquiryType: string
  kindlyPhone: string
  kindlyName: string
  referencePhone: string
  referenceName: string
  phone: string
  address: string
  quotationNo: string
  customerName: string
  gstNo: string
  baseRate: number
  termAdj: number
  gstPct: number
}

export interface QuoteLine {
  id: string
  item: Item
  qty: number
}

export interface LineCalculation {
  effectiveMT: number
  ratePerKg: number
  ratePerPc: number
  totalKg: number
  lineAmount: number
  gstAmount: number
  lineTotal: number
}

export interface QuoteSummary {
  totalKg: number
  totalMat: number
  totalGst: number
  loading: number
  grandTotal: number
}

// Core pricing formulas
export function effectiveMT(item: Item, settings: Settings): number {
  return settings.baseRate + item.diff + settings.termAdj
}

export function ratePerKg(item: Item, settings: Settings): number {
  return effectiveMT(item, settings) / 1000
}

export function ratePerPc(item: Item, settings: Settings): number {
  let wtpc = item.wtpc

  if (['Metal', 'GI', 'Color'].includes(item.type)) {
    const thickness = parseFloat(item.thick.replace('mm', ''))

    let length = 0
    let width = 0

    if (item.size === '8x4') {
      length = 8
      width = 4
    } else if (item.size === '6x3') {
      length = 6
      width = 3
    } else if (item.size === '10x4') {
      length = 10
      width = 4
    } else if (item.size === '12x4') {
      length = 12
      width = 4
    }

    wtpc = length * width * thickness * 0.942
  }

  return Number((ratePerKg(item, settings) * wtpc).toFixed(2))
}

// Calculate line totals
export function calculateLine(line: QuoteLine, settings: Settings): LineCalculation {
  const mt = effectiveMT(line.item, settings)
  const rkg = ratePerKg(line.item, settings)
  const rpc = ratePerPc(line.item, settings)
  // const totalKg = Number((line.item.wtpc * line.qty).toFixed(2))
  let wtpc = line.item.wtpc

  if (['Metal', 'GI', 'Color'].includes(line.item.type)) {
    const thickness = parseFloat(line.item.thick.replace('mm', ''))

    let length = 0
    let width = 0

    if (line.item.size === '8x4') {
      length = 8
      width = 4
    } else if (line.item.size === '6x3') {
      length = 6
      width = 3
    } else if (line.item.size === '10x4') {
      length = 10
      width = 4
    } else if (line.item.size === '12x4') {
      length = 12
      width = 4
    }

    wtpc = length * width * thickness * 0.942
  }

  const totalKg = Number((wtpc * line.qty).toFixed(2))
  const lineAmount = Number((rpc * line.qty).toFixed(2))
  const gstAmount = Number((lineAmount * settings.gstPct / 100).toFixed(2))
  const lineTotal = lineAmount + gstAmount

  return {
    effectiveMT: mt,
    ratePerKg: rkg,
    ratePerPc: rpc,
    totalKg,
    lineAmount,
    gstAmount,
    lineTotal,
  }
}

// Calculate quotation summary
export function calculateSummary(lines: QuoteLine[], settings: Settings): QuoteSummary {
  let totalKg = 0
  let totalMat = 0
  let totalGst = 0

  for (const line of lines) {
    const calc = calculateLine(line, settings)
    totalKg += calc.totalKg
    totalMat += calc.lineAmount
    totalGst += calc.gstAmount
  }

  // Loading charge: ₹350 per MT
  const loading = Number((350 * (totalKg / 1000)).toFixed(2))
  const grandTotal = totalMat + totalGst + loading

  return {
    totalKg,
    totalMat,
    totalGst,
    loading,
    grandTotal,
  }
}

// Format currency in Indian Rupees
export function formatINR(n: number, decimals = 2): string {
  return '₹' + n.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatINRInt(n: number): string {
  return '₹' + Math.round(n).toLocaleString('en-IN')
}

// Format number with Indian locale
export function formatNumber(n: number): string {
  return n.toLocaleString('en-IN')
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
