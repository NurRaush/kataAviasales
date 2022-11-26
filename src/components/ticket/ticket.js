import { add } from 'date-fns'

import styles from './ticket.module.scss'

function Ticket({ price, carrier, from, to }) {
  const fromBegDate = new Date(from.date)
  const toBegDate = new Date(to.date)
  const fromEndDate = add(fromBegDate, { minutes: from.duration })
  const toEndDate = add(toBegDate, { minutes: to.duration })
  const durFromHours = Math.floor(from.duration / 60)
  const durFromMinutes = from.duration - durFromHours * 60
  const durToHours = Math.floor(to.duration / 60)
  const durToMinutes = to.duration - durToHours * 60
  return (
    <div className={styles.ticket}>
      <div className={styles.row}>
        <span className={styles.price}>{`Цена ${price}Р`}</span>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="CompanyLogo" />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <span className={styles.title}>{`${from.origin} - ${from.destination}`}</span>
          <span
            className={styles.content}
          >{`${fromBegDate.getHours()}:${fromBegDate.getMinutes()} - ${fromEndDate.getHours()}:${fromEndDate.getMinutes()}`}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>В пути</span>
          <span className={styles.content}>{`${durFromHours}ч ${durFromMinutes}мин`}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>{`${from.stops.length} пересадки`}</span>
          <span className={styles.content}>{`${from.stops.join(', ')}`}</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <span className={styles.title}>{`${to.origin} - ${to.destination}`}</span>
          <span
            className={styles.content}
          >{`${toBegDate.getHours()}:${toBegDate.getMinutes()} - ${toEndDate.getHours()}:${toEndDate.getMinutes()}`}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>В пути</span>
          <span className={styles.content}>{`${durToHours}ч ${durToMinutes}мин`}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>{`${to.stops.length} пересадки`}</span>
          <span className={styles.content}>{`${to.stops.join(',')}`}</span>
        </div>
      </div>
    </div>
  )
}

export default Ticket
