import { parseISO, startOfWeek, endOfWeek, isWithinInterval, format } from "date-fns"

export function isDateInThisWeek(dateStr) {
  const date = parseISO(dateStr) // safely parses "2025-03-30"

  const now = new Date()
  const weekStart = startOfWeek(now, { weekStartsOn: 0 }) // Sunday
  const weekEnd = endOfWeek(now, { weekStartsOn: 0 })     // Saturday

  return isWithinInterval(date, { start: weekStart, end: weekEnd })
}


  

export function formatDate(date = new Date()) {
  return format(date, "yyyy-MM-dd") // → "2025-03-30"
}