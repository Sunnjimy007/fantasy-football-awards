'use client'

import { useState } from 'react'
import { useAwardStore } from '@/store/awardStore'
import { TEAMS, TEAMS_AND_PLAYERS } from '@/data/teamsAndPlayers'
import { getMockQuote } from '@/data/quotes'
import { getTeamTheme } from '@/data/teamThemes'
import Certificate from './Certificate'
import QuoteBubble from './QuoteBubble'
import { downloadCertificate } from '@/lib/downloadCertificate'

const SEASONS = ['2025/2026', '2024/2025', '2023/2024', '2022/2023']

const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 bg-white transition-shadow'

function LoadingView({ awardeeName, quotePlayer, accent }: { awardeeName: string; quotePlayer: string; accent: string }) {
  return (
    <div className="text-center py-16 space-y-6">
      <div className="text-7xl animate-bounce drop-shadow-lg select-none">🏆</div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Immortalising {awardeeName || 'your legend'}...
        </h2>
        <p className="text-white/60 text-sm">
          Consulting {quotePlayer || 'a legend'} for an exclusive quote
        </p>
      </div>

      <div className="flex justify-center gap-2.5 pt-1">
        {[0, 180, 360].map((delay) => (
          <div
            key={delay}
            className="w-2.5 h-2.5 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}ms`, backgroundColor: accent }}
          />
        ))}
      </div>
    </div>
  )
}

export default function AwardForm() {
  const setFormData = useAwardStore((s) => s.setFormData)
  const setQuote = useAwardStore((s) => s.setQuote)
  const setIsLoading = useAwardStore((s) => s.setIsLoading)
  const isLoading = useAwardStore((s) => s.isLoading)
  const formData = useAwardStore((s) => s.formData)

  const [awardeeName, setAwardeeName] = useState('')
  const [fantasyTeamName, setFantasyTeamName] = useState('')
  const [favoriteTeam, setFavoriteTeam] = useState('')
  const [season, setSeason] = useState(SEASONS[0])
  const [awardTitle, setAwardTitle] = useState('')
  const [quotePlayer, setQuotePlayer] = useState('')
  const [optionalStory, setOptionalStory] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const players = favoriteTeam ? TEAMS_AND_PLAYERS[favoriteTeam] : []
  const theme = getTeamTheme(favoriteTeam)

  const handleTeamChange = (team: string) => {
    setFavoriteTeam(team)
    setQuotePlayer('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormData({ awardeeName, fantasyTeamName, favoriteTeam, season, awardTitle, quotePlayer, optionalStory })
    await new Promise<void>((resolve) =>
      setTimeout(resolve, 1800 + Math.random() * 700)
    )
    setQuote(getMockQuote(quotePlayer))
    setIsLoading(false)
    setSubmitted(true)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const name = formData?.awardeeName ?? 'award'
      await downloadCertificate(`${name}-fantasy-award.png`)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleReset = () => {
    setAwardeeName('')
    setFantasyTeamName('')
    setFavoriteTeam('')
    setSeason(SEASONS[0])
    setAwardTitle('')
    setQuotePlayer('')
    setOptionalStory('')
    setIsLoading(false)
    setSubmitted(false)
  }

  const showCertificate = submitted && !isLoading && formData

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 transition-all duration-700"
      style={{ background: theme.pageBg }}
    >
      <div
        className={`w-full transition-all duration-300 ${showCertificate ? 'max-w-2xl' : 'max-w-lg'}`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 drop-shadow-lg">🏆</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Fantasy Awards</h1>
          <p className="text-white/50 mt-2 text-sm">
            Immortalise your league&apos;s finest (and most disastrous)
          </p>
        </div>

        {isLoading ? (
          <LoadingView awardeeName={awardeeName} quotePlayer={quotePlayer} accent={theme.accent} />
        ) : showCertificate ? (
          <div className="w-full space-y-5">
            <QuoteBubble />
            <Certificate />

            {formData.optionalStory && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">
                  The Story
                </p>
                <p className="text-white/80 italic text-sm leading-relaxed">
                  &ldquo;{formData.optionalStory}&rdquo;
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-white/10 text-white font-semibold py-3 rounded-xl hover:bg-white/20 active:scale-95 transition-all border border-white/20 text-sm"
              >
                ← Create Another
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex-1 font-semibold py-3 rounded-xl text-sm transition-all border active:scale-95"
                style={
                  isDownloading
                    ? { backgroundColor: theme.accent + '60', color: '#fff', borderColor: theme.accent + '40', cursor: 'wait' }
                    : { backgroundColor: theme.accent, color: theme.accentText, borderColor: theme.accent }
                }
              >
                {isDownloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  '↓ Download PNG'
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 border-t-4"
            style={{ borderTopColor: theme.accent }}
          >
            <div>
              <label className={labelClass}>Awardee Name</label>
              <input
                type="text"
                value={awardeeName}
                onChange={(e) => setAwardeeName(e.target.value)}
                placeholder="e.g. Baaz"
                className={inputClass}
                style={{ '--tw-ring-color': theme.accent } as React.CSSProperties}
              />
            </div>

            <div>
              <label className={labelClass}>Fantasy Team Name</label>
              <input
                type="text"
                value={fantasyTeamName}
                onChange={(e) => setFantasyTeamName(e.target.value)}
                placeholder="e.g. Mind the Gap"
                className={inputClass}
                style={{ '--tw-ring-color': theme.accent } as React.CSSProperties}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Favourite Club</label>
                <select
                  value={favoriteTeam}
                  onChange={(e) => handleTeamChange(e.target.value)}
                  className={inputClass}
                  style={{ '--tw-ring-color': theme.accent } as React.CSSProperties}
                >
                  <option value="">Select a club...</option>
                  {TEAMS.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Season</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className={inputClass}
                  style={{ '--tw-ring-color': theme.accent } as React.CSSProperties}
                >
                  {SEASONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Award Title</label>
              <input
                type="text"
                value={awardTitle}
                onChange={(e) => setAwardTitle(e.target.value)}
                placeholder="e.g. Best Buy in the League"
                className={inputClass}
                style={{ '--tw-ring-color': theme.accent } as React.CSSProperties}
              />
            </div>

            <div>
              <label className={labelClass}>Quote Style</label>
              <select
                value={quotePlayer}
                onChange={(e) => setQuotePlayer(e.target.value)}
                disabled={!favoriteTeam}
                className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ '--tw-ring-color': theme.accent } as React.CSSProperties}
              >
                <option value="">{favoriteTeam ? 'Select a player...' : 'Pick a club first'}</option>
                {players.map((player) => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>
                The Story / Joke{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={optionalStory}
                onChange={(e) => setOptionalStory(e.target.value)}
                placeholder="Give us the context — the more specific, the funnier the award"
                rows={3}
                className={`${inputClass} resize-none`}
                style={{ '--tw-ring-color': theme.accent } as React.CSSProperties}
              />
            </div>

            <button
              type="submit"
              className="w-full font-bold py-3.5 rounded-xl active:scale-95 transition-all text-lg shadow-lg"
              style={{ backgroundColor: theme.accent, color: theme.accentText }}
            >
              Generate Award 🏆
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
