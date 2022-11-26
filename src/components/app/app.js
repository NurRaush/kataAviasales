import Transfers from '../transfers'
import Filters from '../filters'
import TicketsList from '../tickets-list'
import { getTickets } from '../../actions'

import logo from './logo.png'
import styles from './app.module.scss'

function App() {
  getTickets()
  return (
    <>
      <img className={styles.logo} src={logo} alt="logo" />
      <div className={styles.mainContainer}>
        <Transfers />
        <div className={styles.ticketsContainer}>
          <Filters className={styles.filters} />
          <TicketsList className={styles.ticketsList} />
        </div>
      </div>
    </>
  )
}
getTickets()

export default App
