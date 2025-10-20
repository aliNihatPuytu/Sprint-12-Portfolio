import { useQuery } from '@tanstack/react-query'

export function useDataQuery(lang) {
  return useQuery({
    queryKey: ['siteData', lang],
    queryFn: async () => {
      const res = await fetch(`/data/${lang}.json`)
      if (!res.ok) throw new Error('Data not found')
      return res.json()
    },
    staleTime: 1000 * 60 * 5,
  })
}
