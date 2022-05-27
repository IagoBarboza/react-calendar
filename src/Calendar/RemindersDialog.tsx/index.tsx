import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Reminder, useCalendarContext } from '../../common/CalendarContext'
import ReminderForm from './ReminderForm'
import { RemindersDialogContext } from './RemindersDialogContext'
import RemindersList from './RemindersList'

interface Props {
  show: boolean
  onHide: () => void
}

export default function RemindersDialog ({ show, onHide }: Props) {
  const [reminderToEdit, setReminderToEdit] = useState<Reminder | null>(null)
  const { selectedYear, selectedMonth, selectedDay } = useCalendarContext()

  return (
    <Modal show={show} onHide={onHide}>
      <RemindersDialogContext.Provider value={{reminderToEdit, setReminderToEdit}}>
        <Modal.Header closeButton>
          <Modal.Title>Reminders ({selectedYear}-{selectedMonth}-{selectedDay})</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <RemindersList />
          <ReminderForm />
        </Modal.Body>
      </RemindersDialogContext.Provider>
    </Modal>
  )
}