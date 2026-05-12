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
      {/* <main className="mx-auto max-w-5xl px-4 py-7 md:px-6"> */}
      <main className="w-full px-4 py-7 md:px-6 lg:px-8">
        {/* <div className="flex flex-col gap-5">
          <BaseRateSection settings={settings} onUpdate={updateSettings} />
          <AddItemSection settings={settings} onAdd={addLine} />
          <QuotationSection
            settings={settings}
            lines={lines}
            onRemove={removeLine}
            onClear={clearLines}
          />
        </div> */}
        <div className="flex flex-col gap-5">

          {/* Section 1 */}
          <div className="print:hidden">
            <BaseRateSection
              settings={settings}
              onUpdate={updateSettings}
            />
          </div>

          {/* Section 2 + 3 Side by Side */}
          <div className="grid items-stretch gap-5 print:block lg:grid-cols-[37%_62%] items-start">

            {/* Left Side */}
            <div className="print:hidden h-full">
              <AddItemSection
                settings={settings}
                onAdd={addLine}
              />
            </div>

            {/* Right Side */}
            <div className="print:block min-w-0 overflow-hidden">
              <QuotationSection
                settings={settings}
                lines={lines}
                onRemove={removeLine}
                onClear={clearLines}
              />
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
