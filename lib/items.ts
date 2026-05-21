// Steel pipe item catalog with pricing differentials
export interface Item {
  type: 'Round pipe' | 'Rect-Square Pipe' | 'SemiCoil' | 'Metal Sheet' | 'GI Sheet' | 'Color Sheet'
  size: string
  thick: string
  wtpc: number // weight per piece in kg
  diff: number // differential over base rate in ₹/MT
  category?: string
  height?: number
  width?: number
}

export const ITEMS: Item[] = [
  // ROUND PIPES
  { type: "Round pipe", size: '25 OD (3/4")', thick: "1.2mm", wtpc: 5, diff: 6500 },
  { type: "Round pipe", size: '25 OD (3/4")', thick: "1.5mm", wtpc: 6, diff: 5500 },
  { type: "Round pipe", size: '25 OD (3/4")', thick: "1.9mm", wtpc: 7, diff: 5500 },
  { type: "Round pipe", size: '31 OD (1")', thick: "1.2mm", wtpc: 6, diff: 5500 },
  { type: "Round pipe", size: '31 OD (1")', thick: "1.6mm", wtpc: 7, diff: 4500 },
  { type: "Round pipe", size: '31 OD (1")', thick: "2.0mm", wtpc: 9, diff: 4500 },
  { type: "Round pipe", size: '31 OD (1")', thick: "2.5mm", wtpc: 11, diff: 4500 },
  { type: "Round pipe", size: '42 OD (1.25")', thick: "1.2mm", wtpc: 7, diff: 5000 },
  { type: "Round pipe", size: '42 OD (1.25")', thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Round pipe", size: '42 OD (1.25")', thick: "2.0mm", wtpc: 13, diff: 4500 },
  { type: "Round pipe", size: '42 OD (1.25")', thick: "2.5mm", wtpc: 15, diff: 4500 },
  { type: "Round pipe", size: '42 OD (1.25")', thick: "2.8mm", wtpc: 18, diff: 4500 },
  { type: "Round pipe", size: '48 OD (1.5")', thick: "1.2mm", wtpc: 9, diff: 4500 },
  { type: "Round pipe", size: '48 OD (1.5")', thick: "1.6mm", wtpc: 12, diff: 3500 },
  { type: "Round pipe", size: '48 OD (1.5")', thick: "2.0mm", wtpc: 14, diff: 3500 },
  { type: "Round pipe", size: '48 OD (1.5")', thick: "2.5mm", wtpc: 18, diff: 3500 },
  { type: "Round pipe", size: '48 OD (1.5")', thick: "2.8mm", wtpc: 20, diff: 3500 },
  { type: "Round pipe", size: '60 OD (2")', thick: "1.2mm", wtpc: 11, diff: 4500 },
  { type: "Round pipe", size: '60 OD (2")', thick: "1.6mm", wtpc: 14, diff: 3500 },
  { type: "Round pipe", size: '60 OD (2")', thick: "2.0mm", wtpc: 18, diff: 3500 },
  { type: "Round pipe", size: '60 OD (2")', thick: "2.2mm", wtpc: 20, diff: 3500 },
  { type: "Round pipe", size: '60 OD (2")', thick: "2.5mm", wtpc: 22, diff: 3500 },
  { type: "Round pipe", size: '60 OD (2")', thick: "2.8mm", wtpc: 24, diff: 3500 },
  { type: "Round pipe", size: '76 OD (2.5")', thick: "1.6mm", wtpc: 18, diff: 4300 },
  { type: "Round pipe", size: '76 OD (2.5")', thick: "2.0mm", wtpc: 22, diff: 4000 },
  { type: "Round pipe", size: '76 OD (2.5")', thick: "2.2mm", wtpc: 26, diff: 4000 },
  { type: "Round pipe", size: '76 OD (2.5")', thick: "2.7mm", wtpc: 30, diff: 4000 },
  { type: "Round pipe", size: '88 OD (3")', thick: "1.6mm", wtpc: 22, diff: 5500 },
  { type: "Round pipe", size: '88 OD (3")', thick: "2.0mm", wtpc: 27, diff: 4500 },
  { type: "Round pipe", size: '88 OD (3")', thick: "2.5mm", wtpc: 33, diff: 4500 },
  { type: "Round pipe", size: '88 OD (3")', thick: "3.0mm", wtpc: 40, diff: 4500 },
  // SQUARE PIPES
  { type: "Rect-Square Pipe", size: "15×15", thick: "1.2mm", wtpc: 3.5, diff: 7000 },

  { type: "Rect-Square Pipe", size: "19×19", thick: "1.0mm", wtpc: 4, diff: 9800 },
  { type: "Rect-Square Pipe", size: "19×19", thick: "1.2mm", wtpc: 5, diff: 6500 },
  { type: "Rect-Square Pipe", size: "19×19", thick: "1.6mm", wtpc: 6, diff: 5500 },
  { type: "Rect-Square Pipe", size: "19×19", thick: "1.9mm", wtpc: 7, diff: 5500 },

  { type: "Rect-Square Pipe", size: "25×25", thick: "1.0mm", wtpc: 5, diff: 8800 },
  { type: "Rect-Square Pipe", size: "25×25", thick: "1.2mm", wtpc: 6, diff: 5500 },
  { type: "Rect-Square Pipe", size: "25×25", thick: "1.6mm", wtpc: 7, diff: 4500 },
  { type: "Rect-Square Pipe", size: "25×25", thick: "2.0mm", wtpc: 9, diff: 4500 },
  { type: "Rect-Square Pipe", size: "25×25", thick: "2.5mm", wtpc: 11, diff: 4500 },

  { type: "Rect-Square Pipe", size: "32×32", thick: "1.2mm", wtpc: 7, diff: 5000 },
  { type: "Rect-Square Pipe", size: "32×32", thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Rect-Square Pipe", size: "32×32", thick: "2.0mm", wtpc: 13, diff: 4500 },
  { type: "Rect-Square Pipe", size: "32×32", thick: "2.5mm", wtpc: 15, diff: 4500 },
  { type: "Rect-Square Pipe", size: "32×32", thick: "2.8mm", wtpc: 18, diff: 4500 },

  { type: "Rect-Square Pipe", size: "38×38", thick: "1.2mm", wtpc: 9, diff: 4500 },
  { type: "Rect-Square Pipe", size: "38×38", thick: "1.6mm", wtpc: 12, diff: 3500 },
  { type: "Rect-Square Pipe", size: "38×38", thick: "2.0mm", wtpc: 14, diff: 3500 },
  { type: "Rect-Square Pipe", size: "38×38", thick: "2.5mm", wtpc: 18, diff: 3500 },
  { type: "Rect-Square Pipe", size: "38×38", thick: "2.9mm", wtpc: 20, diff: 3500 },

  { type: "Rect-Square Pipe", size: "50×50", thick: "1.2mm", wtpc: 11, diff: 4500 },
  { type: "Rect-Square Pipe", size: "50×50", thick: "1.5mm", wtpc: 14, diff: 3500 },
  { type: "Rect-Square Pipe", size: "50×50", thick: "2.0mm", wtpc: 18, diff: 3500 },
  { type: "Rect-Square Pipe", size: "50×50", thick: "2.2mm", wtpc: 20, diff: 3500 },
  { type: "Rect-Square Pipe", size: "50×50", thick: "2.5mm", wtpc: 22, diff: 3500 },
  { type: "Rect-Square Pipe", size: "50×50", thick: "2.8mm", wtpc: 24, diff: 3500 },

  { type: "Rect-Square Pipe", size: "62×62", thick: "1.6mm", wtpc: 18, diff: 4300 },
  { type: "Rect-Square Pipe", size: "62×62", thick: "2.0mm", wtpc: 22, diff: 4000 },
  { type: "Rect-Square Pipe", size: "62×62", thick: "2.2mm", wtpc: 26, diff: 4000 },
  { type: "Rect-Square Pipe", size: "62×62", thick: "2.7mm", wtpc: 30, diff: 4000 },

  { type: "Rect-Square Pipe", size: "72×72", thick: "1.6mm", wtpc: 22, diff: 5500 },
  { type: "Rect-Square Pipe", size: "72×72", thick: "2.0mm", wtpc: 27, diff: 4500 },
  { type: "Rect-Square Pipe", size: "72×72", thick: "2.5mm", wtpc: 33, diff: 4500 },
  { type: "Rect-Square Pipe", size: "72×72", thick: "3.0mm", wtpc: 40, diff: 4500 },
  // RECTANGULAR PIPES
  { type: "Rect-Square Pipe", size: "40×20", thick: "1.0mm", wtpc: 5.5, diff: 8000 },
  { type: "Rect-Square Pipe", size: "40×20", thick: "1.2mm", wtpc: 7, diff: 5500 },
  { type: "Rect-Square Pipe", size: "40×20", thick: "1.6mm", wtpc: 9, diff: 4500 },
  { type: "Rect-Square Pipe", size: "40×20", thick: "2.0mm", wtpc: 13, diff: 4500 },
  { type: "Rect-Square Pipe", size: "40×20", thick: "2.5mm", wtpc: 18, diff: 4500 },

  { type: "Rect-Square Pipe", size: "50×25", thick: "1.2mm", wtpc: 9, diff: 4500 },
  { type: "Rect-Square Pipe", size: "50×25", thick: "1.6mm", wtpc: 12, diff: 3500 },
  { type: "Rect-Square Pipe", size: "50×25", thick: "2.0mm", wtpc: 14, diff: 3500 },
  { type: "Rect-Square Pipe", size: "50×25", thick: "2.5mm", wtpc: 18, diff: 3500 },
  { type: "Rect-Square Pipe", size: "50×25", thick: "2.9mm", wtpc: 20, diff: 3500 },

  { type: "Rect-Square Pipe", size: "25×75", thick: "1.5mm", wtpc: 14, diff: 3500 },
  { type: "Rect-Square Pipe", size: "25×75", thick: "1.9mm", wtpc: 18, diff: 3500 },

  { type: "Rect-Square Pipe", size: "60×40", thick: "1.2mm", wtpc: 11, diff: 4500 },
  { type: "Rect-Square Pipe", size: "60×40", thick: "1.6mm", wtpc: 14, diff: 3500 },
  { type: "Rect-Square Pipe", size: "60×40", thick: "2.0mm", wtpc: 18, diff: 3500 },
  { type: "Rect-Square Pipe", size: "60×40", thick: "2.5mm", wtpc: 22, diff: 3500 },

  { type: "Rect-Square Pipe", size: "80×40", thick: "1.4mm", wtpc: 16, diff: 6300 },
  { type: "Rect-Square Pipe", size: "80×40", thick: "1.6mm", wtpc: 18, diff: 4300 },
  { type: "Rect-Square Pipe", size: "80×40", thick: "2.0mm", wtpc: 22, diff: 4000 },
  { type: "Rect-Square Pipe", size: "80×40", thick: "2.5mm", wtpc: 26, diff: 4000 },
  { type: "Rect-Square Pipe", size: "80×40", thick: "2.7mm", wtpc: 30, diff: 4000 },

  { type: "Rect-Square Pipe", size: "96×48", thick: "1.6mm", wtpc: 22, diff: 5500 },
  { type: "Rect-Square Pipe", size: "96×48", thick: "2.0mm", wtpc: 27, diff: 4500 },
  { type: "Rect-Square Pipe", size: "96×48", thick: "2.5mm", wtpc: 33, diff: 4500 },
  { type: "Rect-Square Pipe", size: "96×48", thick: "3.0mm", wtpc: 40, diff: 4500 },

  // SEMI COIL
  { type: "SemiCoil", size: "Standard", thick: "0.8mm", wtpc: 50, diff: 2000 },
  { type: "SemiCoil", size: "Standard", thick: "1.0mm", wtpc: 60, diff: 2000 },

  // SHEET
  // METAL SHEET
  { type: "Metal Sheet", size: "6x3", thick: "0.5mm", wtpc: 20, diff: 1500 },
  { type: "Metal Sheet", size: "6x3", thick: "1.0mm", wtpc: 20, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "1.5mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "2.0mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "2.5mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "3.0mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "3.5mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "4.0mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "4.5mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "5.0mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "5.5mm", wtpc: 25, diff: 1500 },
  { type: "Metal Sheet", size: "8x4", thick: "6.0mm", wtpc: 25, diff: 1500 },

  // GI SHEET
  { type: "GI Sheet", size: "8x4", thick: "0.5mm", wtpc: 30, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "1.0mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "1.5mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "2.0mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "2.5mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "3.0mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "3.5mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "4.0mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "4.5mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "5.0mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "5.5mm", wtpc: 35, diff: 1600 },
  { type: "GI Sheet", size: "10x4", thick: "6.0mm", wtpc: 35, diff: 1600 },

  // COLOR COATED SHEET
  { type: "Color Sheet", size: "8x4", thick: "0.5mm", wtpc: 28, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "1.0mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "1.5mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "2.0mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "2.5mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "3.0mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "3.5mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "4.0mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "4.5mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "5.0mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "5.5mm", wtpc: 40, diff: 1800 },
  { type: "Color Sheet", size: "12x4", thick: "6.0mm", wtpc: 40, diff: 1800 },
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
// export function getThicknessesForTypeAndSize(type: Item['type'], size: string): string[] {
//   return ITEMS.filter(i => i.type === type && i.size === size).map(i => i.thick)
// }
export function getThicknessesForTypeAndSize(type: string, size?: string) {
  const list = ITEMS.filter((i) => {
    const isSheet =
      type === 'Metal Sheet' ||
      type === 'GI Sheet' ||
      type === 'Color Sheet' ||
      type === 'Color Coated'

    if (isSheet) {
      return i.type === type || (type === 'Color Coated' && i.type === 'Color Sheet')
    }

    return i.type === type && i.size === size
  })

  return [...new Set(list.map((i) => i.thick))]
}

// Find a specific item
export function findItem(type: Item['type'], size: string, thick: string): Item | undefined {
  return ITEMS.find(i => i.type === type && i.size === size && i.thick === thick)
}
