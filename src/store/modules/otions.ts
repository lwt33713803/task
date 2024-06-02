import cover from '@/utils/curry/cover'
import { defineStore } from 'pinia'

export const optionsStore = defineStore('options',
  {
    state: () => {
      return {
        dictMap: {},
      }
    },
    actions: {
      async setDictMap() {
        const { data, code } = await searchTypeAll()
        if (code === 1) {
          this.dictMap = cover(data)
          localStorage.setItem('dictMap', JSON.stringify(cover(data)))
        }
      }
    },
    persist: true,
  })