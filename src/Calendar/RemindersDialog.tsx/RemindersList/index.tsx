import { Badge } from 'react-bootstrap'
import styled from 'styled-components'
import style from './RemindersList.module.scss'
import moment from 'moment'
import { reminders as remindersSetterGetter} from '../../../cache'
import { useReminderDialogContext } from '../RemindersDialogContext'
import { useCalendarContext, useReminders } from '../../../common/CalendarContext'
import { useEffect } from 'react'

const StyledBadge = styled(Badge)`
  font-size: 15px;
  padding: 13px;
  margin-top: 10px;
`

export default function RemindersList() {
  const { selectedDay } = useCalendarContext()
  const { setReminderToEdit } = useReminderDialogContext()
  // @ts-expect-error
  const { dateReminders } = useReminders(selectedDay)

  return (
    <div
      className={style.RemindersList}
      data-testid="reminders-list"
    >
      { dateReminders.map(({ id, description, color, unix }) => (
        <div className={style.Row} key={id}>
          <StyledBadge bg={color}>
            ({moment.unix(unix).format('HH:mm')}) {description}
          </StyledBadge>
          <div className={style.Actions}>
            <div
              className={style.Action}
              onClick={() => { setReminderToEdit({ id, description, color, unix }) }}
            >
              Edit
            </div>
            <div
              className={style.Action}
              onClick={() => { remindersSetterGetter(remindersSetterGetter().filter(reminder => reminder.unix !== unix)) }}
            >
              Remove
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
