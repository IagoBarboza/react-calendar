import moment from 'moment'

export function getMonthCells( selectedYear: string, selectedMonth: string ) {
  const cells: Array<{ day: string | null }> = [
    { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null },
    { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null },
    { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null },
    { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null },
    { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null },
    { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null }
  ]
  
  let startingCell = moment(`${selectedYear}-${selectedMonth}-01`).startOf('month').isoWeekday()
  if (startingCell === 7) startingCell = 0;
  
  const DAYS_IN_MONTH = moment(`${selectedYear}-${selectedMonth}-01`).daysInMonth()
  
  let daysCounter = 1;
  
  for (let i = startingCell; i < DAYS_IN_MONTH + startingCell; i++) {
    cells[i].day = String(daysCounter).padStart(2, '0')
    daysCounter++
  }
  
  const DAYS_IN_WEEK = 7
  const rows = []
  
  for (let w = 0; w < cells.length; w += DAYS_IN_WEEK) {
    const row = cells.slice(w, w + DAYS_IN_WEEK)
    rows.push(row)
  }

  return rows
}