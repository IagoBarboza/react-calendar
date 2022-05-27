import style from './Calendar.module.scss'
import RemindersDialog from './RemindersDialog.tsx';
import Header from './Header';
import Grid from './Grid';
import MonthYearSelector from './MonthYearSelector';
import { useCalendarContext } from '../common/CalendarContext';

export default function Calendar() {
  const { selectedDay, setSelectedDay } = useCalendarContext()
  const showRemindersDialog = !!selectedDay


  return (
    <div className={style.Calendar}>
      <MonthYearSelector />
      <Header />
      <Grid />
      <RemindersDialog
        show={showRemindersDialog}
        onHide={() => setSelectedDay(null)}
      />
    </div>
  );
}
