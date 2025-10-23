import { useQuery } from '@tanstack/react-query'

const urlMap = import.meta.glob('../data/*.json', {
  eager: true,
  query: '?url',
  import: 'default',
})

const URL_BY_LANG = Object.fromEntries(
  Object.entries(urlMap).map(([path, url]) => {
    const name = path.split('/').pop() || 'en.json'
    return [name.replace(/\.json$/i, '').toLowerCase(), url]
  })
)

export function useDataQuery(lang) {
  const key = (lang || 'en').toLowerCase()
  return useQuery({
    queryKey: ['siteData', key],
    queryFn: async () => {
      const url = URL_BY_LANG[key] ?? URL_BY_LANG.en
      if (!url) throw new Error('Data URL not found')
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) throw new Error('Data not found')
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
