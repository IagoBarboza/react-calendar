import { Badge, Button, Dropdown, Form, DropdownButton } from 'react-bootstrap'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { reminders as remindersGetterSetter } from '../../../cache'
import { Reminder, useCalendarContext, useReminders } from '../../../common/CalendarContext'
import style from './ReminderForm.module.scss'
import styled from 'styled-components'
import { useReminderDialogContext } from '../RemindersDialogContext'
import { v4 as uuidv4 } from 'uuid'

const StyledBadge = styled(Badge)`
  font-size: 15px;
`

const StyledButton = styled(Button)`
  margin-top: 20px;
  margin-right: 20px;
`

interface NewReminder extends Omit<Reminder, 'unix' | 'id'> {
  time: string
}

export default function ReminderForm() {
  const [ reminder, setReminder ] = useState<NewReminder>({ description: '', color: 'primary', time: '' })
  const { reminderToEdit, setReminderToEdit } = useReminderDialogContext()
  const { selectedYear, selectedMonth, selectedDay } = useCalendarContext()
  // @ts-expect-error
  const { allReminders } = useReminders(selectedDay)
  
  const COLOR_OPTIONS = ['primary', 'secondary', 'success', 'danger', 'info', 'dark']

  function onAddReminder() {
    const REMINDER_DATE_TIME_UNIX = moment(`${selectedYear}-${selectedMonth}-${selectedDay} ${reminder.time}`).unix()
    remindersGetterSetter([...allReminders, {
      id: uuidv4(),
      description: reminder.description,
      color: reminder.color,
      unix: REMINDER_DATE_TIME_UNIX
    }])
    setReminder({ description: '', color: 'primary', time: ''})
  }

  function updateReminder() {
    const REMINDER_DATE_TIME_UNIX = moment(`${selectedYear}-${selectedMonth}-${selectedDay} ${reminder.time}`).unix()
    // @ts-expect-error
    remindersGetterSetter([...allReminders.filter(r => r.id !== reminderToEdit.id),
      {
        // @ts-expect-error
        id: reminderToEdit.id,
        description: reminder.description,
        color: reminder.color,
        unix: REMINDER_DATE_TIME_UNIX
      }
    ])
    setReminder({ description: '', color: 'primary', time: ''})
    setReminderToEdit(null)
  }

  function cancelUpdate() {
    setReminder({ description: '', color: 'primary', time: ''})
    setReminderToEdit(null)
  }

  useEffect(() => {
    if(reminderToEdit) {
      const { description, color } = reminderToEdit
      
      setReminder({
        description,
        color,
        time: moment.unix(reminderToEdit.unix).format('HH:mm') 
      })
    }
  }, [reminderToEdit])

  return (
    <>
      <h5 className={style.FormTitle}>
        { reminderToEdit 
          ? 'Edit reminder' 
          : 'Add a new reminder'
        }
      </h5>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          data-testid="reminder-description-input"
          type="text"
          id="reminderDescription"
          maxLength={30}
          value={reminder.description}
          onChange={e => setReminder(currentReminder => ({ ...currentReminder, description: e.target.value }))}
        />
        <Form.Text id="reminderDescription">
          The description must be 1-30 characters long
        </Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Time</Form.Label>
        <Form.Control
          data-testid="reminder-time-input"
          type="time"
          id="reminderTime"
          value={reminder.time}
          onChange={e => setReminder(currentReminder => ({ ...currentReminder, time: e.target.value }))}
        />
        <Form.Text id="reminderDescription">
          The time in hours and minutes
        </Form.Text>
      </Form.Group>

      <DropdownButton
        variant={reminder.color}
        title={reminder.color}
        style={{ marginTop: '20px', marginBottom: '15px' }}
      >
        {COLOR_OPTIONS.map(color => (
          <Dropdown.Item key={color} >
            <StyledBadge
              bg={color}
              onClick={() => setReminder(currentReminder => ({ ...currentReminder, color }))}
            >
              {color}
            </StyledBadge>
          </Dropdown.Item>
        ))}
       </DropdownButton>
      <div>
        { reminderToEdit &&
          <StyledButton
            variant="secondary"
            onClick={() => cancelUpdate()}
          >
            Cancel
          </StyledButton>
        }

        <StyledButton
          data-testid="reminder-primary-action-button"
          variant="primary"
          onClick={() => reminderToEdit ? updateReminder() : onAddReminder()}
        >
          { reminderToEdit ? 'Update' : 'Add' }
        </StyledButton>  
      </div>
    </>
  )
}