
import { computed, toRefs, readonly, Ref, ToRefs } from 'vue'
import { useNow, useDateFormat } from '@vueuse/core'

type DateFormatUnit = 'Y' | 'M' | 'D' | 'H' | 'm' | 's'

export default function useTimeFormat(
  date: Date | string | undefined,
  format: DateFormatUnit[]
): [Ref<string>, ToRefs<ComputedRef<string>>] {
  const now = useNow()
  const formatted = toRefs(useDateFormat(date ?? now, format.join('')))
  const reactiveValue = useDateFormat(now, format.join(''))

  return [
    reactiveValue, formatted,
  ]
}
