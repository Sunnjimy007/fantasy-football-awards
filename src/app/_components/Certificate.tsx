'use client'

import { useAwardStore, type AwardFormData } from '@/store/awardStore'
import { getTeamTheme } from '@/data/teamThemes'

function CertificateCard({ data }: { data: AwardFormData }) {
  const theme = getTeamTheme(data.favoriteTeam)
  const quote = data.quote ?? "They know what they did."

  return (
    <div
      id="certificate"
      className="relative rounded-2xl p-1.5 shadow-2xl"
      style={{ background: theme.certBorder }}
    >
      {/* Inner parchment */}
      <div
        className="relative rounded-xl px-6 py-8 sm:px-10 sm:py-10 overflow-hidden"
        style={{ background: theme.certInnerBg }}
      >

        {/* Faint watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[180px] opacity-[0.04]">🏆</span>
        </div>

        {/* Corner stars */}
        <span className="absolute top-4 left-4 text-2xl opacity-40">⭐</span>
        <span className="absolute top-4 right-4 text-2xl opacity-40">⭐</span>
        <span className="absolute bottom-4 left-4 text-2xl opacity-40">⭐</span>
        <span className="absolute bottom-4 right-4 text-2xl opacity-40">⭐</span>

        {/* Header */}
        <div className="text-center mb-6 relative">
          <p
            className="text-xs font-black tracking-[0.35em] uppercase"
            style={{ color: theme.certTextSecondary }}
          >
            Fantasy Football League
          </p>
          <div className="flex items-center gap-3 my-2.5">
            <div className="h-px flex-1" style={{ backgroundColor: theme.certDivider }} />
            <span className="text-sm" style={{ color: theme.certDivider }}>⚽</span>
            <div className="h-px flex-1" style={{ backgroundColor: theme.certDivider }} />
          </div>
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase"
            style={{ color: theme.certTextMuted }}
          >
            Official Award Certificate
          </p>
        </div>

        {/* Presented to */}
        <p className="text-center text-sm italic mb-2" style={{ color: theme.certTextSecondary }}>
          This certificate is proudly presented to
        </p>

        {/* Awardee name */}
        <h2
          className="text-center text-4xl sm:text-5xl font-black tracking-tight leading-none mb-1 break-words"
          style={{ color: theme.certTextPrimary }}
        >
          {data.awardeeName}
        </h2>

        {/* Fantasy team */}
        <p className="text-center text-sm italic mb-6" style={{ color: theme.certTextMuted }}>
          of{' '}
          <span className="font-semibold not-italic" style={{ color: theme.certTextSecondary }}>
            {data.fantasyTeamName}
          </span>
        </p>

        {/* Trophy */}
        <div className="text-center text-5xl my-2 drop-shadow-md">🏆</div>

        {/* Award title */}
        <div className="text-center my-5">
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
            style={{ color: theme.certTextMuted }}
          >
            In recognition of
          </p>
          <h3
            className="text-xl sm:text-2xl font-black uppercase tracking-wide leading-snug break-words"
            style={{ color: theme.certTextPrimary }}
          >
            &ldquo;{data.awardTitle}&rdquo;
          </h3>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1" style={{ backgroundColor: theme.certDivider }} />
          <span style={{ color: theme.certDivider }}>★ ★ ★</span>
          <div className="h-px flex-1" style={{ backgroundColor: theme.certDivider }} />
        </div>

        {/* Quote */}
        <div className="max-w-sm mx-auto text-center mb-1">
          <blockquote className="italic text-sm leading-relaxed" style={{ color: theme.certTextSecondary }}>
            &ldquo;{quote}&rdquo;
          </blockquote>
          <p className="text-xs font-semibold mt-2" style={{ color: theme.certTextMuted }}>
            — {data.quotePlayer}{' '}
            <span className="font-normal opacity-70">(probably)</span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default function Certificate() {
  const formData = useAwardStore((s) => s.formData)

  if (!formData) return null

  return <CertificateCard data={formData} />
}
