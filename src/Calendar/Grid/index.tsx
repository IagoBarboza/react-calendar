import { getMonthCells } from '../../common/utils/date';
import style from './Grid.module.scss'
import Cell from './Cell'
import { useCalendarContext } from '../../common/CalendarContext';

export default function Grid() {
  const { selectedYear, selectedMonth } = useCalendarContext()
  const rows = getMonthCells(selectedYear, selectedMonth)

  return (
    <div data-testid="grid">
      {rows.map((row, index) => (
        <div key={index} className={style.Row}>
          {row.map(({ day }, index) => <Cell
            key={index}
            day={day}
          />)}
        </div>
      ))}
    </div>
  )
} 