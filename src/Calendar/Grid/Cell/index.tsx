import { useCalendarContext } from '../../../common/CalendarContext'
import style from './Cell.module.scss'
import RemindersList from './RemindersList'

interface Props {
  day: string | null
}

export default function Cell({ day }: Props) {

  const { setSelectedDay } = useCalendarContext()

  function handleCellClick () {
    setSelectedDay(day)
  }
  
  return (
    <div
      data-testid={day}
      className={`${style.Cell} ${!day ? style.disabled : ''} ${day ? style.hover : ''}`}
      onClick={() => day && handleCellClick()}
    >
      { day && <>
        <div className={style.Day}>{day}</div>
        <RemindersList day={day} />
      </> }
    </div>
  )
}