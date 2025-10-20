import { createSlice } from '@reduxjs/toolkit'

const initial = (() => {
  const saved = localStorage.getItem('theme')
  return { mode: saved === 'dark' ? 'dark' : 'light' }
})()

const themeSlice = createSlice({
  name: 'theme',
  initialState: initial,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.mode)
    },
    setTheme(state, action) {
      state.mode = action.payload
      localStorage.setItem('theme', state.mode)
    }
  }
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
