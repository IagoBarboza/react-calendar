import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import moment from 'moment'
import { act } from 'react-dom/test-utils'
import { AppBuilder } from './test-helpers/AppBuilder'
import { reminders } from './cache'

function openRemindersDialog() {
  let startingCellIndex = moment().startOf('month').isoWeekday()
  if (startingCellIndex === 7) startingCellIndex = 0

  const grid = screen.getByTestId('grid')
  const firstRow= grid.children.item(0)
  const startingCell = firstRow?.children.item(startingCellIndex)

  // @ts-expect-error
  userEvent.click(startingCell)
}

async function createNewReminder() {
  const descriptionInput = screen.getByTestId('reminder-description-input')
  userEvent.type(descriptionInput, 'Something to do{enter}')
  
  const timeInput = screen.getByTestId('reminder-time-input')
  userEvent.type(timeInput, '2000')
  
  await act(async () => {
    const reminderPrimaryActionButton = screen.getByTestId('reminder-primary-action-button')
    userEvent.click(reminderPrimaryActionButton)
  })
}

test('should start with the current month and year in the month-year selector', () => {
  render(<AppBuilder />)

  reminders([])

  expect(screen.getByText(moment().format('MMM YYYY'))).toBeInTheDocument()
})

test('should show the days of the week', () => {
  render(<AppBuilder />)

  reminders([]);

  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(dayOfWeek => {
    expect(screen.getByText(dayOfWeek)).toBeInTheDocument()
  })
})

test('should show the grid containing the days of the selected month and year', () => {
  render(<AppBuilder />)

  reminders([])

  const NUMBER_OF_DAYS = moment().daysInMonth()
  let daysCounter = 0
  let currentDay
  
  while (daysCounter < NUMBER_OF_DAYS) {
    daysCounter++
    currentDay = String(daysCounter).padStart(2, '0')
    expect(screen.getByTestId(currentDay)).toBeInTheDocument()
  }
})

test('should show the day "01" in the correct starting cell', () => {
  render(<AppBuilder />)

  reminders([])

  let startingCellIndex = moment().startOf('month').isoWeekday()
  if (startingCellIndex === 7) startingCellIndex = 0

  const grid = screen.getByTestId('grid')
  const firstRow= grid.children.item(0)
  const startingCell = firstRow?.children.item(startingCellIndex)

  expect(startingCell?.innerHTML).toContain('01')
})

test('should show the "RemindersDialog" when some cell is clicked', () => {
  render(<AppBuilder />)

  reminders([])

  openRemindersDialog()

  expect(screen.getByText(`Reminders (${moment().startOf('month').format('YYYY-MM-DD')})`))
})

test('should add a new reminder in the list when the form is filled and the add button is clicked', async () => {
  render(<AppBuilder />)
  
  reminders([])

  openRemindersDialog()

  await createNewReminder()

  await act(async () => {
    const newReminder = screen.getByTestId('reminders-list').children.item(0)
    expect(newReminder?.innerHTML).toContain(`(20:00) Something to do`)
  })
})

test('should add a new reminder in the grid cell when the form is filled and the add button is clicked', async () => {
  render(<AppBuilder />)
  
  reminders([])

  openRemindersDialog()

  await createNewReminder()

  await act(async () => {
    let startingCellIndex = moment().startOf('month').isoWeekday()
    if (startingCellIndex === 7) startingCellIndex = 0

    const grid = screen.getByTestId('grid')
    const firstRow= grid.children.item(0)
    const startingCell = firstRow?.children.item(startingCellIndex)
    
    expect(startingCell?.children.item(1)?.children.item(0)?.innerHTML).toBe('(20:00) Something to do')
  })
})

test('should delete a reminder on the list when the "Remove Button" is clicked', async () => {
  render(<AppBuilder />)

  reminders([])

  openRemindersDialog()
 
  await createNewReminder()

  await act(async () => {
    const removeButton = screen.getByText('Remove')
    userEvent.click(removeButton)
  })

  await act(async () => {
    const newReminder = screen.getByTestId('reminders-list').children.item(0)
    expect(newReminder).toBeNull()
  })
})

test('should delete a reminder on the grid cell when the "Remove Button" is clicked', async () => {
  render(<AppBuilder />)

  reminders([])

  openRemindersDialog()
 
  await createNewReminder()

  await act(async () => {
    const removeButton = screen.getByText('Remove')
    userEvent.click(removeButton)
  })

  await act(async () => {
    let startingCellIndex = moment().startOf('month').isoWeekday()
    if (startingCellIndex === 7) startingCellIndex = 0

    const grid = screen.getByTestId('grid')
    const firstRow= grid.children.item(0)
    const startingCell = firstRow?.children.item(startingCellIndex)
    
    expect(startingCell?.children.item(1)?.children.item(0)).toBeNull()
  })

})

// TODO:

// should edit a reminder in the list 

// should edit a reminder in the grid cell

// should cancel a reminder edition when the cancel button is clicked

// should go to next month when the next month button is clicked

// should go to the previous month when the previous month button is clicked

// should go to the next year when the next month button is clicked and the current month is december

// should go to the previous year when the previous month button is clicked and the current month is january

// ...
