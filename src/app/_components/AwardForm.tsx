'use client'

import { useState } from 'react'
import { useAwardStore } from '@/store/awardStore'
import { TEAMS, TEAMS_AND_PLAYERS } from '@/data/teamsAndPlayers'
import { getMockQuote, ALL_QUOTES } from '@/data/quotes'
import { getTeamTheme } from '@/data/teamThemes'
import Certificate from './Certificate'
import { downloadCertificate } from '@/lib/downloadCertificate'

const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 bg-white transition-shadow'

function LoadingView({ awardeeName, accent }: { awardeeName: string; accent: string }) {
  return (
    <div className="text-center py-16 space-y-6">
      <div className="text-7xl animate-bounce drop-shadow-lg select-none">🏆</div>
      <h2 className="text-2xl font-bold text-white">
        Immortalising {awardeeName || 'your legend'}...
      </h2>
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
  const setIsLoading = useAwardStore((s) => s.setIsLoading)
  const isLoading = useAwardStore((s) => s.isLoading)
  const formData = useAwardStore((s) => s.formData)

  const [awardeeName, setAwardeeName] = useState('')
  const [fantasyTeamName, setFantasyTeamName] = useState('')
  const [favoriteTeam, setFavoriteTeam] = useState('')
  const [awardTitle, setAwardTitle] = useState('')
  const [quotePlayer, setQuotePlayer] = useState('')
  const [previewQuote, setPreviewQuote] = useState('')
  const [previewIndex, setPreviewIndex] = useState(0)
  const [optionalStory, setOptionalStory] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const players = favoriteTeam ? TEAMS_AND_PLAYERS[favoriteTeam] : []
  const theme = getTeamTheme(favoriteTeam)

  const handleTeamChange = (team: string) => {
    setFavoriteTeam(team)
    setQuotePlayer('')
    setPreviewQuote('')
  }

  const handlePlayerChange = (player: string) => {
    setQuotePlayer(player)
    setPreviewQuote(player ? getMockQuote(player) : '')
  }

  const handleNewQuote = () => {
    let nextIndex: number
    do {
      nextIndex = Math.floor(Math.random() * ALL_QUOTES.length)
    } while (nextIndex === previewIndex && ALL_QUOTES.length > 1)
    setPreviewIndex(nextIndex)
    setPreviewQuote(ALL_QUOTES[nextIndex])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormData({ awardeeName, fantasyTeamName, favoriteTeam, awardTitle, quotePlayer, optionalStory, quote: previewQuote })
    await new Promise<void>((resolve) =>
      setTimeout(resolve, 1200 + Math.random() * 600)
    )
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
    setAwardTitle('')
    setQuotePlayer('')
    setPreviewQuote('')
    setPreviewIndex(0)
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
          <LoadingView awardeeName={awardeeName} accent={theme.accent} />
        ) : showCertificate ? (
          /* Certificate view — award + actions only */
          <div className="w-full space-y-5">
            <Certificate />
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
                onChange={(e) => handlePlayerChange(e.target.value)}
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

              {/* Inline quote preview */}
              {previewQuote && (
                <div
                  className="mt-3 rounded-xl p-4 border-l-4 bg-gray-50"
                  style={{ borderLeftColor: theme.accent }}
                >
                  <p className="text-gray-700 italic text-sm leading-relaxed">
                    &ldquo;{previewQuote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs font-semibold text-gray-500">— {quotePlayer}</span>
                    <button
                      type="button"
                      onClick={handleNewQuote}
                      className="text-xs font-semibold px-3 py-1 rounded-full border transition-all active:scale-95"
                      style={{ color: theme.accent, borderColor: theme.accent + '60', backgroundColor: theme.accent + '10' }}
                    >
                      🔀 New Quote
                    </button>
                  </div>
                </div>
              )}
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
