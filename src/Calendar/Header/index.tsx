import style from './Header.module.scss'

export default function Header() {
  const headerItems = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className={style.Header}>
      {headerItems.map((i, index) => (
        <div
          key={index}
          className={style.HeaderItem}
        >
          {i}
        </div>
      ))}
    </div>
  )
}