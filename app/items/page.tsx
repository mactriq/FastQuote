'use client'

import { useState, useMemo, useRef } from 'react'
import { TopNav } from '@/components/top-nav'
import { useItemsStore, CustomItem } from '@/hooks/use-items-store'
import { Item } from '@/lib/items'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Search, Plus, Pencil, Trash2, Download, Upload, RotateCcw } from 'lucide-react'

type FilterType = 'All' | Item['type']

export default function ItemsPage() {
  const {
    items,
    isLoaded,
    addItem,
    updateItem,
    deleteItem,
    exportItems,
    importItems,
    resetToDefaults,
  } = useItemsStore()

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<FilterType>('All')
  const [editingItem, setEditingItem] = useState<CustomItem | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [importText, setImportText] = useState('')
  const [importError, setImportError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state for add/edit
  const [formData, setFormData] = useState<Omit<Item, 'id'>>({
    type: 'Round',
    size: '',
    thick: '',
    wtpc: 0,
    diff: 0,
  })

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        search === '' ||
        item.size.toLowerCase().includes(search.toLowerCase()) ||
        item.thick.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'All' || item.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [items, search, typeFilter])

  const handleExport = () => {
    const data = exportItems()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `surya-items-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      const text = event.target?.result as string
      setImportText(text)
      setImportError('')
      setIsImportDialogOpen(true)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleImportConfirm = () => {
    const result = importItems(importText)
    if (result.success) {
      setIsImportDialogOpen(false)
      setImportText('')
      setImportError('')
    } else {
      setImportError(result.error || 'Import failed')
    }
  }

  const handleEdit = (item: CustomItem) => {
    setEditingItem(item)
    setFormData({
      type: item.type,
      size: item.size,
      thick: item.thick,
      wtpc: item.wtpc,
      diff: item.diff,
    })
  }

  const handleSaveEdit = () => {
    if (editingItem) {
      updateItem(editingItem.id, formData)
      setEditingItem(null)
    }
  }

  const handleAdd = () => {
    setFormData({ type: 'Round', size: '', thick: '', wtpc: 0, diff: 0 })
    setIsAddDialogOpen(true)
  }

  const handleSaveAdd = () => {
    if (formData.size && formData.thick) {
      addItem(formData)
      setIsAddDialogOpen(false)
    }
  }

  const handleDelete = (item: CustomItem) => {
    if (item.id.startsWith('default-')) {
      if (confirm('This will reset any customizations to this default item. Continue?')) {
        deleteItem(item.id)
      }
    } else {
      if (confirm('Delete this custom item?')) {
        deleteItem(item.id)
      }
    }
  }

  const handleReset = () => {
    if (confirm('Reset all items to defaults? This will remove all custom items and modifications.')) {
      resetToDefaults()
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TopNav />
      <main className="mx-auto max-w-5xl px-4 py-6 md:px-6">
        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={(v: FilterType) => setTypeFilter(v)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Types</SelectItem>
                <SelectItem value="Round">Round</SelectItem>
                <SelectItem value="Square">Square</SelectItem>
                <SelectItem value="Rect">Rect</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleAdd}>
              <Plus className="mr-1.5 h-4 w-4" />
              Add Item
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-1.5 h-4 w-4" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-1.5 h-4 w-4" />
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="mr-1.5 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredItems.length} of {items.length} items
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-24">Thick</TableHead>
                <TableHead className="w-24 text-right">Wt/pc (kg)</TableHead>
                <TableHead className="w-28 text-right">Diff (Rs/MT)</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map(item => (
                <TableRow key={item.id} className={item.isCustom ? 'bg-primary/5' : ''}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell className="font-mono text-sm">{item.size}</TableCell>
                  <TableCell className="font-mono text-sm">{item.thick}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{item.wtpc}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {item.diff.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={open => !open && setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update the item details. Changes to default items are saved as overrides.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(v: Item['type']) => setFormData({ ...formData, type: v })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Round">Round</SelectItem>
                  <SelectItem value="Square">Square</SelectItem>
                  <SelectItem value="Rect">Rect</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Size</Label>
              <Input
                value={formData.size}
                onChange={e => setFormData({ ...formData, size: e.target.value })}
                className="col-span-3"
                placeholder='e.g., 25 OD (3/4") or 25×25'
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Thickness</Label>
              <Input
                value={formData.thick}
                onChange={e => setFormData({ ...formData, thick: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 1.6mm"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Wt/pc (kg)</Label>
              <Input
                type="number"
                value={formData.wtpc}
                onChange={e => setFormData({ ...formData, wtpc: parseFloat(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Diff (Rs/MT)</Label>
              <Input
                type="number"
                value={formData.diff}
                onChange={e => setFormData({ ...formData, diff: parseFloat(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
            <DialogDescription>
              Add a custom item to the catalog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(v: Item['type']) => setFormData({ ...formData, type: v })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Round">Round</SelectItem>
                  <SelectItem value="Square">Square</SelectItem>
                  <SelectItem value="Rect">Rect</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Size</Label>
              <Input
                value={formData.size}
                onChange={e => setFormData({ ...formData, size: e.target.value })}
                className="col-span-3"
                placeholder='e.g., 25 OD (3/4") or 25×25'
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Thickness</Label>
              <Input
                value={formData.thick}
                onChange={e => setFormData({ ...formData, thick: e.target.value })}
                className="col-span-3"
                placeholder="e.g., 1.6mm"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Wt/pc (kg)</Label>
              <Input
                type="number"
                value={formData.wtpc}
                onChange={e => setFormData({ ...formData, wtpc: parseFloat(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Diff (Rs/MT)</Label>
              <Input
                type="number"
                value={formData.diff}
                onChange={e => setFormData({ ...formData, diff: parseFloat(e.target.value) || 0 })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAdd} disabled={!formData.size || !formData.thick}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Items</DialogTitle>
            <DialogDescription>
              Preview the items to import. This will replace all custom items.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <textarea
              value={importText}
              onChange={e => {
                setImportText(e.target.value)
                setImportError('')
              }}
              className="h-64 w-full rounded-md border bg-muted p-3 font-mono text-xs"
              placeholder="Paste JSON here..."
            />
            {importError && (
              <p className="mt-2 text-sm text-destructive">{importError}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportConfirm}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
