'use client'

import { useAwardStore } from '@/store/awardStore'

export default function QuoteBubble() {
  const formData = useAwardStore((s) => s.formData)
  const randomizeQuote = useAwardStore((s) => s.randomizeQuote)

  if (!formData?.quote) return null

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <p className="text-xs font-semibold text-green-300 uppercase tracking-widest text-center">
          💬 In the words of {formData.quotePlayer}...
        </p>
        <button
          onClick={randomizeQuote}
          className="shrink-0 text-xs font-semibold text-amber-400 hover:text-amber-300 active:scale-95 transition-all border border-amber-400/40 hover:border-amber-300/60 rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10"
        >
          🔀 New Quote
        </button>
      </div>

      <div className="flex gap-4 items-start">
        {/* Player avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-400 border-4 border-amber-200/50 flex items-center justify-center text-xl shadow-lg mt-1 select-none">
          ⚽
        </div>

        {/* Speech bubble */}
        <div className="flex-1 relative">
          {/* Bubble tail pointing left toward avatar */}
          <div
            className="absolute -left-3 top-5"
            style={{
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '12px solid white',
            }}
          />

          <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-xl">
            <blockquote className="text-gray-700 italic leading-relaxed text-sm font-medium">
              &ldquo;{formData.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-600">
                — {formData.quotePlayer}
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-400">{formData.favoriteTeam}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-400 italic">probably</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
