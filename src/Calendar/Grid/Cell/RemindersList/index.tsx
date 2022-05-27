import style from './RemindersList.module.scss'
import { Badge } from 'react-bootstrap'
import moment from 'moment'
import styled from 'styled-components'
import { useReminders } from '../../../../common/CalendarContext'

interface Props {
  day: string
}

const StyledBadge = styled(Badge)`
  font-size: 11px;
  margin: 2px;
`

export default function RemindersList({ day }: Props) {
  const { dateReminders } = useReminders(day)

  return (
    <div className={style.RemindersList}>
      {dateReminders.map((reminder, index) => (
        <StyledBadge key={index} bg={reminder.color}>({moment.unix(reminder.unix).format('HH:mm')}) {reminder.description}</StyledBadge>
      ))}
    </div>
  )
} 
