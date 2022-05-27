import { InMemoryCache, makeVar } from "@apollo/client"
import { Reminder } from "./common/CalendarContext"

export const reminders = makeVar<Reminder[]>([])

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        reminders: {
          read() {
            return reminders()
          }
        }
      }
    }
  }
})