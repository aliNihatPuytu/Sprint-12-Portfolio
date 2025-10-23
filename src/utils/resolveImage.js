const files = import.meta.glob('../assets/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function resolveImage(input) {
  if (!input) return ''
  if (input.startsWith('/') || /^https?:\/\//i.test(input)) return input

  const want = input.replace(/\\/g, '/').toLowerCase()

  for (const [key, url] of Object.entries(files)) {
    const rel = key.split('/assets/images/')[1]?.toLowerCase() || ''
    if (rel === want || rel.endsWith('/' + want)) return url
  }
  return input
}
