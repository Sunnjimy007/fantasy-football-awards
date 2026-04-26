import { create } from 'zustand'
import { ALL_QUOTES } from '@/data/quotes'

export type AwardFormData = {
  awardeeName: string
  fantasyTeamName: string
  favoriteTeam: string
  season: string
  awardTitle: string
  quotePlayer: string
  optionalStory: string
  quote?: string
}

type AwardStore = {
  formData: AwardFormData | null
  isLoading: boolean
  quoteIndex: number
  setFormData: (data: AwardFormData) => void
  setQuote: (quote: string) => void
  setIsLoading: (loading: boolean) => void
  randomizeQuote: () => void
}

export const useAwardStore = create<AwardStore>((set) => ({
  formData: null,
  isLoading: false,
  quoteIndex: 0,
  setFormData: (data) => set({ formData: data }),
  setQuote: (quote) =>
    set((state) =>
      state.formData ? { formData: { ...state.formData, quote } } : state
    ),
  setIsLoading: (loading) => set({ isLoading: loading }),
  randomizeQuote: () =>
    set((state) => {
      if (!state.formData) return state
      let nextIndex: number
      do {
        nextIndex = Math.floor(Math.random() * ALL_QUOTES.length)
      } while (nextIndex === state.quoteIndex && ALL_QUOTES.length > 1)
      return {
        quoteIndex: nextIndex,
        formData: { ...state.formData, quote: ALL_QUOTES[nextIndex] },
      }
    }),
}))
