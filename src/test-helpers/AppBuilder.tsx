import moment from 'moment'
import { useState } from 'react'
import { CalendarContext, CalendarContextProps, Reminder } from '../common/CalendarContext'
import App from '../App'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { cache } from '../cache'

export interface AppBuilderProps {
  children?: JSX.Element,
  calendarContextOverrides?: CalendarContextProps
}

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({ cache })

export function AppBuilder({
  children= <App />,
  calendarContextOverrides
}: AppBuilderProps): JSX.Element {


  const [selectedYear, setSelectedYear] = useState<string>(moment().format('YYYY'))
  const [selectedMonth, setSelectedMonth] = useState<string>(moment().format('MM'))
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const calendarContext = {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    selectedDay,
    setSelectedDay,
    ...calendarContextOverrides
  }

  return (
    <ApolloProvider client={client}>
      <CalendarContext.Provider value={calendarContext}>
        { children }
      </CalendarContext.Provider>
    </ApolloProvider>
  )
}