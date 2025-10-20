import { createSlice } from '@reduxjs/toolkit'

const initialLang = (() => {
  const saved = localStorage.getItem('lang')
  return { current: saved || 'en' }
})()

const languageSlice = createSlice({
  name: 'language',
  initialState: initialLang,
  reducers: {
    setLanguage(state, action) {
      state.current = action.payload
      localStorage.setItem('lang', state.current)
    },
    toggleLanguage(state) {
      state.current = state.current === 'en' ? 'tr' : 'en'
      localStorage.setItem('lang', state.current)
    }
  }
})

export const { setLanguage, toggleLanguage } = languageSlice.actions
export default languageSlice.reducer
