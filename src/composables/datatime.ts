import { computed, type ComputedRef, onBeforeUnmount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/locale.ts'

export function useDateTime() {
  const localeStore = useLocaleStore()
  const { selectedLocale } = storeToRefs(localeStore)

  const timeZone = 'Europe/Paris'

  const dateTimeFormatter = computed(() =>
    Intl.DateTimeFormat(selectedLocale.value, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
    })
  )

  const dateTime = ref<Date>(new Date())
  const interval = ref<number | undefined>(undefined)

  onMounted(() => {
    interval.value = setInterval(() => {
      dateTime.value = new Date()
    }, 500)
  })

  onBeforeUnmount(() => {
    clearInterval(interval.value)
  })

  const getDatePart = (dateParts: Array<Intl.DateTimeFormatPart>, type: string): string =>
    dateParts.find((datePart) => datePart.type === type)?.value ?? ''

  const formattedDateTime: ComputedRef<string> = computed(() => {
    const dateParts = dateTimeFormatter.value.formatToParts(dateTime.value)

    const weekday = getDatePart(dateParts, 'weekday')
    const day = getDatePart(dateParts, 'day')
    const month = getDatePart(dateParts, 'month')
    const hour = getDatePart(dateParts, 'hour')
    const minute = getDatePart(dateParts, 'minute')
    const second = getDatePart(dateParts, 'second')

    return `${weekday} ${day} ${month} ${hour}:${minute}:${second}`
  })

  const getCurrentTimeZoneOffset = (): string => {
    return new Date()
      .toLocaleString('en', { timeZone, timeZoneName: 'longOffset' })
      .split(' ')
      .reverse()[0]
      .replace('GMT', 'UTC')
  }

  return { timeZone, formattedDateTime, getCurrentTimeZoneOffset }
}
