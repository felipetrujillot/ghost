const maxAge = 3600 * 24 * 365

/**
 *
 * @param theme
 */
export const setTheme = (theme: 'dark' | 'light') => {
  const useTheme = useCookie('useTheme', {
    maxAge,
  })

  if (theme === 'dark') {
    document.body.classList.replace('light', theme)
  }
  if (theme === 'light') {
    document.body.classList.replace('dark', theme)
  }

  useTheme.value = theme
  return theme
}
