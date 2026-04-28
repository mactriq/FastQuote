'use client'

import { Header } from '@/components/header'
import { BaseRateSection } from '@/components/base-rate-section'
import { AddItemSection } from '@/components/add-item-section'
import { QuotationSection } from '@/components/quotation-section'
import { useQuotationStore } from '@/hooks/use-quotation-store'
import { TopNav } from '@/components/top-nav'

export default function QuotationTool() {
  const { settings, lines, isLoaded, updateSettings, addLine, removeLine, clearLines } = useQuotationStore()

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
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-7 md:px-6">
        <div className="flex flex-col gap-5">
          <BaseRateSection settings={settings} onUpdate={updateSettings} />
          <AddItemSection settings={settings} onAdd={addLine} />
          <QuotationSection
            settings={settings}
            lines={lines}
            onRemove={removeLine}
            onClear={clearLines}
          />
        </div>
      </main>
    </div>
  )
}
