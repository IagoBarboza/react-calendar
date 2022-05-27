import moment from 'moment'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useCalendarContext } from '../../common/CalendarContext'
import style from './MonthYearSelector.module.scss'

const StyledButton = styled(Button)`
  margin-right: 15px;
`

export default function MonthYearSelector() {
  const { selectedYear, setSelectedYear, selectedMonth, setSelectedMonth } = useCalendarContext()

  function next() {
    const nextYear = moment(`${selectedYear}-${selectedMonth}`).add(1, 'months').format('YYYY')
    const nextMonth = moment(`${selectedYear}-${selectedMonth}`).add(1, 'months').format('MM')
    setSelectedYear(nextYear)
    setSelectedMonth(nextMonth)
  }

  function previous() {
    const nextYear = moment(`${selectedYear}-${selectedMonth}`).subtract(1, 'months').format('YYYY')
    const nextMonth = moment(`${selectedYear}-${selectedMonth}`).subtract(1, 'months').format('MM')
    setSelectedYear(nextYear)
    setSelectedMonth(nextMonth)
  }

  return (
    <div className={style.MonthYearSelector}>
      <StyledButton
        variant='secondary'
        onClick={() => previous()}
      >
        {'<'}
      </StyledButton>
      <StyledButton
        variant='secondary'
        onClick={() => next()}
      >
        {'>'}
      </StyledButton>
      <h2>{moment(`${selectedYear}-${selectedMonth}`).format('MMM YYYY')}</h2>
    </div>
  )
}