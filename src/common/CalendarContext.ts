import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface CalendarContextProps {
  selectedMonth: string
  setSelectedMonth: Dispatch<SetStateAction<string>>
  selectedYear: string
  setSelectedYear: Dispatch<SetStateAction<string>> 
  selectedDay: string | null
  setSelectedDay: Dispatch<SetStateAction<string | null>>
}

// @ts-expect-error
export const CalendarContext = createContext<CalendarContextProps>(null)

export const useCalendarContext = (): CalendarContextProps => useContext(CalendarContext)

export interface Reminder {
  id: string
  description: string
  color: string
  unix: number
}

export const GET_REMINDERS = gql`
  query GetReminders {
    reminders @client
  }
`

export const useReminders = (day: string): { allReminders: Array<Reminder>, dateReminders: Array<Reminder> } => {
  const { data } = useQuery(GET_REMINDERS)
  const { selectedYear, selectedMonth } = useCalendarContext()

  const SELECTED_DATE_UNIX = moment(`${selectedYear}-${selectedMonth}-${day}`).unix()
  
  const allReminders = data.reminders as Array<Reminder>
  
  const dateReminders = allReminders
    .filter(reminder => moment.unix(reminder.unix).format('YYYY-MM-DD') === moment.unix(SELECTED_DATE_UNIX).format('YYYY-MM-DD'))
    .sort((a, b) => a.unix - b.unix)

  return {
    allReminders,
    dateReminders
  }
}