import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { api } from '../utils/api'

export function usePostReqres() {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post('/workintech', payload)
      return res.data
    },
    onSuccess: (data) => {
      toast.success('Reqres API: Başarılı bir POST isteği yapıldı!')
      console.log('Reqres response:', data)
    },
    onError: (err) => {
      toast.error('Reqres API: Hata oluştu')
      console.error(err)
    }
  })
}
