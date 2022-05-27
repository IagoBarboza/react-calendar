import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Reminder } from "../../common/CalendarContext";

export interface RemindersDialogContextProps {
  reminderToEdit: Reminder | null
  setReminderToEdit: Dispatch<SetStateAction<Reminder | null>>
}

// @ts-expect-error
export const RemindersDialogContext = createContext<RemindersDialogContextProps>(null)

export const useReminderDialogContext = (): RemindersDialogContextProps => useContext(RemindersDialogContext)
