// Steel pipe item catalog with pricing differentials
export interface Item {
  type: 'Round' | 'Square' | 'Rect'
  size: string
  thick: string
  wtpc: number // weight per piece in kg
  diff: number // differential over base rate in ₹/MT
}

export const ITEMS: Item[] = [
  // ROUND PIPES
  { type: "Round", size: '25 OD (3/4")', thick: "1.2mm", wtpc: 3, diff: 6500 },
  { type: "Round", size: '25 OD (3/4")', thick: "1.5mm", wtpc: 6, diff: 6000 },
  { type: "Round", size: '25 OD (3/4")', thick: "1.6mm", wtpc: 7, diff: 5500 },
  { type: "Round", size: '31 OD (1")', thick: "1.2mm", wtpc: 6, diff: 5500 },
  { type: "Round", size: '31 OD (1")', thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Round", size: '31 OD (1")', thick: "2.0mm", wtpc: 9, diff: 4500 },
  { type: "Round", size: '31 OD (1")', thick: "2.5mm", wtpc: 11, diff: 4500 },
  { type: "Round", size: '42 OD (1.25")', thick: "1.2mm", wtpc: 7, diff: 5000 },
  { type: "Round", size: '42 OD (1.25")', thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Round", size: '42 OD (1.25")', thick: "2.0mm", wtpc: 13, diff: 4500 },
  { type: "Round", size: '42 OD (1.25")', thick: "2.5mm", wtpc: 15, diff: 4500 },
  { type: "Round", size: '42 OD (1.25")', thick: "2.8mm", wtpc: 18, diff: 4500 },
  { type: "Round", size: '48 OD (1.5")', thick: "1.2mm", wtpc: 6, diff: 5500 },
  { type: "Round", size: '48 OD (1.5")', thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Round", size: '48 OD (1.5")', thick: "2.0mm", wtpc: 14, diff: 4500 },
  { type: "Round", size: '48 OD (1.5")', thick: "2.5mm", wtpc: 18, diff: 4500 },
  { type: "Round", size: '48 OD (1.5")', thick: "2.8mm", wtpc: 20, diff: 4500 },
  { type: "Round", size: '60 OD (2")', thick: "1.2mm", wtpc: 11, diff: 4500 },
  { type: "Round", size: '60 OD (2")', thick: "1.6mm", wtpc: 14, diff: 3500 },
  { type: "Round", size: '60 OD (2")', thick: "2.0mm", wtpc: 18, diff: 3500 },
  { type: "Round", size: '60 OD (2")', thick: "2.2mm", wtpc: 20, diff: 3500 },
  { type: "Round", size: '60 OD (2")', thick: "2.5mm", wtpc: 22, diff: 3500 },
  { type: "Round", size: '60 OD (2")', thick: "2.8mm", wtpc: 24, diff: 3500 },
  { type: "Round", size: '76 OD (2.5")', thick: "1.6mm", wtpc: 18, diff: 4300 },
  { type: "Round", size: '76 OD (2.5")', thick: "2.0mm", wtpc: 22, diff: 4000 },
  { type: "Round", size: '76 OD (2.5")', thick: "2.2mm", wtpc: 26, diff: 4000 },
  { type: "Round", size: '76 OD (2.5")', thick: "2.7mm", wtpc: 30, diff: 3500 },
  { type: "Round", size: '88 OD (3")', thick: "1.6mm", wtpc: 22, diff: 4500 },
  { type: "Round", size: '88 OD (3")', thick: "2.0mm", wtpc: 27, diff: 4000 },
  { type: "Round", size: '88 OD (3")', thick: "2.5mm", wtpc: 33, diff: 4000 },
  { type: "Round", size: '88 OD (3")', thick: "3.0mm", wtpc: 40, diff: 4000 },
  // SQUARE PIPES
  { type: "Square", size: "15×15", thick: "1.0mm", wtpc: 4, diff: 9800 },
  { type: "Square", size: "15×15", thick: "1.2mm", wtpc: 5, diff: 6500 },
  { type: "Square", size: "15×15", thick: "1.6mm", wtpc: 6, diff: 5500 },
  { type: "Square", size: "15×15", thick: "1.9mm", wtpc: 7, diff: 5500 },
  { type: "Square", size: "19×19", thick: "1.0mm", wtpc: 5, diff: 8800 },
  { type: "Square", size: "19×19", thick: "1.2mm", wtpc: 6, diff: 5500 },
  { type: "Square", size: "19×19", thick: "1.6mm", wtpc: 7, diff: 5500 },
  { type: "Square", size: "19×19", thick: "2.0mm", wtpc: 9, diff: 5100 },
  { type: "Square", size: "25×25", thick: "1.0mm", wtpc: 5, diff: 5500 },
  { type: "Square", size: "25×25", thick: "1.2mm", wtpc: 6, diff: 5500 },
  { type: "Square", size: "25×25", thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Square", size: "25×25", thick: "2.0mm", wtpc: 9, diff: 5100 },
  { type: "Square", size: "25×25", thick: "2.5mm", wtpc: 13, diff: 4500 },
  { type: "Square", size: "32×32", thick: "1.2mm", wtpc: 7, diff: 5000 },
  { type: "Square", size: "32×32", thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Square", size: "32×32", thick: "2.0mm", wtpc: 13, diff: 4500 },
  { type: "Square", size: "32×32", thick: "2.5mm", wtpc: 15, diff: 4500 },
  { type: "Square", size: "32×32", thick: "2.8mm", wtpc: 18, diff: 4500 },
  { type: "Square", size: "38×38", thick: "1.2mm", wtpc: 9, diff: 4500 },
  { type: "Square", size: "38×38", thick: "1.6mm", wtpc: 13, diff: 3500 },
  { type: "Square", size: "38×38", thick: "2.0mm", wtpc: 18, diff: 3500 },
  { type: "Square", size: "38×38", thick: "1.9mm", wtpc: 20, diff: 3500 },
  { type: "Square", size: "50×50", thick: "1.2mm", wtpc: 11, diff: 4500 },
  { type: "Square", size: "50×50", thick: "1.6mm", wtpc: 14, diff: 4500 },
  { type: "Square", size: "50×50", thick: "2.0mm", wtpc: 18, diff: 3500 },
  { type: "Square", size: "50×50", thick: "2.2mm", wtpc: 20, diff: 3500 },
  { type: "Square", size: "50×50", thick: "2.5mm", wtpc: 22, diff: 3500 },
  { type: "Square", size: "50×50", thick: "2.8mm", wtpc: 24, diff: 3500 },
  { type: "Square", size: "62×62", thick: "1.6mm", wtpc: 18, diff: 4300 },
  { type: "Square", size: "62×62", thick: "2.0mm", wtpc: 21, diff: 4000 },
  { type: "Square", size: "62×62", thick: "2.2mm", wtpc: 14, diff: 4000 },
  { type: "Square", size: "62×62", thick: "2.7mm", wtpc: 30, diff: 4000 },
  { type: "Square", size: "72×72", thick: "1.6mm", wtpc: 22, diff: 4500 },
  { type: "Square", size: "72×72", thick: "2.0mm", wtpc: 27, diff: 4000 },
  { type: "Square", size: "72×72", thick: "2.5mm", wtpc: 33, diff: 4000 },
  { type: "Square", size: "72×72", thick: "3.0mm", wtpc: 40, diff: 4000 },
  // RECTANGULAR PIPES
  { type: "Rect", size: "40×20", thick: "1.0mm", wtpc: 5.5, diff: 8000 },
  { type: "Rect", size: "40×20", thick: "1.2mm", wtpc: 7, diff: 6500 },
  { type: "Rect", size: "40×20", thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Rect", size: "40×20", thick: "2.0mm", wtpc: 13, diff: 4500 },
  { type: "Rect", size: "40×20", thick: "2.5mm", wtpc: 18, diff: 4500 },
  { type: "Rect", size: "50×25", thick: "1.2mm", wtpc: 9, diff: 4500 },
  { type: "Rect", size: "50×25", thick: "1.6mm", wtpc: 12, diff: 3500 },
  { type: "Rect", size: "50×25", thick: "2.0mm", wtpc: 14, diff: 3500 },
  { type: "Rect", size: "50×25", thick: "2.5mm", wtpc: 18, diff: 3500 },
  { type: "Rect", size: "50×25", thick: "2.9mm", wtpc: 20, diff: 3500 },
  { type: "Rect", size: "75×25", thick: "1.5mm", wtpc: 14, diff: 3500 },
  { type: "Rect", size: "60×40", thick: "1.2mm", wtpc: 11, diff: 4500 },
  { type: "Rect", size: "60×40", thick: "1.6mm", wtpc: 14, diff: 4500 },
  { type: "Rect", size: "60×40", thick: "2.0mm", wtpc: 18, diff: 3500 },
  { type: "Rect", size: "60×40", thick: "2.5mm", wtpc: 22, diff: 3500 },
  { type: "Rect", size: "75×40", thick: "1.4mm", wtpc: 16, diff: 6300 },
  { type: "Rect", size: "75×40", thick: "1.6mm", wtpc: 18, diff: 4300 },
  { type: "Rect", size: "75×40", thick: "2.0mm", wtpc: 22, diff: 4000 },
  { type: "Rect", size: "75×40", thick: "2.5mm", wtpc: 26, diff: 4000 },
  { type: "Rect", size: "75×40", thick: "2.7mm", wtpc: 30, diff: 4000 },
  { type: "Rect", size: "96×48", thick: "1.6mm", wtpc: 22, diff: 5500 },
  { type: "Rect", size: "96×48", thick: "2.0mm", wtpc: 27, diff: 4500 },
  { type: "Rect", size: "96×48", thick: "2.5mm", wtpc: 33, diff: 4500 },
  { type: "Rect", size: "96×48", thick: "3.0mm", wtpc: 40, diff: 4500 },
]

// Get unique pipe types
export function getTypes(): Item['type'][] {
  return [...new Set(ITEMS.map(i => i.type))]
}

// Get sizes for a given type
export function getSizesForType(type: Item['type']): string[] {
  return [...new Set(ITEMS.filter(i => i.type === type).map(i => i.size))]
}

// Get thicknesses for a given type and size
export function getThicknessesForTypeAndSize(type: Item['type'], size: string): string[] {
  return ITEMS.filter(i => i.type === type && i.size === size).map(i => i.thick)
}

// Find a specific item
export function findItem(type: Item['type'], size: string, thick: string): Item | undefined {
  return ITEMS.find(i => i.type === type && i.size === size && i.thick === thick)
}
