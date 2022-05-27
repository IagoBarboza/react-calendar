import { cache } from './cache'
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client'
import moment from "moment"
import { useState } from "react"
import Calendar from "./Calendar"
import { CalendarContext } from "./common/CalendarContext"

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({ cache })

export default function App(): JSX.Element {
  const [selectedYear, setSelectedYear] = useState<string>(moment().format('YYYY'))
  const [selectedMonth, setSelectedMonth] = useState<string>(moment().format('MM'))
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  return (
    <ApolloProvider client={client}>
      <CalendarContext.Provider value={{
        selectedYear: selectedYear,
        setSelectedYear: setSelectedYear,
        selectedMonth: selectedMonth,
        setSelectedMonth: setSelectedMonth,
        selectedDay: selectedDay,
        setSelectedDay: setSelectedDay
      }}>
        <Calendar />
      </CalendarContext.Provider>
    </ApolloProvider>
  )
}