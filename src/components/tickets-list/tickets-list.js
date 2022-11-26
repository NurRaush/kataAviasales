import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Circles } from 'react-loader-spinner'

import { getTickets, showMoreTickets } from '../../actions'
import Ticket from '../ticket'

import styles from './tickets-list.module.scss'

function filterTickets(tickets, filterAll, nonStop, oneChange, twoChanges, threeChanges) {
  let renderTickets = []
  if (filterAll) {
    renderTickets = tickets
  } else {
    renderTickets = tickets.filter((elem) => {
      const stopsFrom = elem.segments[0].stops.length
      const stopsTo = elem.segments[1].stops.length
      return (
        (Number(stopsFrom) === Number(nonStop) ||
          Number(stopsFrom) === Number(oneChange) ||
          Number(stopsFrom) === Number(twoChanges) ||
          Number(stopsFrom) === Number(threeChanges)) &&
        (Number(stopsTo) === Number(threeChanges) ||
          Number(stopsTo) === Number(twoChanges) ||
          Number(stopsTo) === Number(oneChange) ||
          Number(stopsTo) === Number(nonStop))
      )
    })
  }
  return renderTickets
}

function sortTickets(sortName, renderTickets) {
  const tickets = [...renderTickets]
  switch (sortName) {
    case 'cheapest':
      return tickets.sort((a, b) => a.price - b.price)
    case 'fastest':
      return tickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration)
    case 'optimal':
      return tickets.sort(
        (a, b) => a.price + a.segments[0].duration - (b.price + b.segments[0].duration)
      )
    default:
      return tickets
  }
}

function jsxTickets(renderTickets, renderCount) {
  let key = 1
  let ticketList = []
  if (renderTickets.length > 0) {
    ticketList = renderTickets
      .filter((elem, i) => i < renderCount)
      .map((elem) => {
        key += 1
        return (
          <Ticket
            price={elem.price}
            carrier={elem.carrier}
            from={elem.segments[0]}
            to={elem.segments[1]}
            key={key}
          />
        )
      })
  }
  return ticketList
}

function TicketsList({
  tickets,
  transfers,
  sortName,
  renderCount,
  getTicket,
  showMoreTicket,
  downloadError,
  isLoading,
}) {
  const { filterAll, filterNonStop, filterOneChange, filterTwoChanges, filterThreeChanges } =
    transfers
  const nonStop = filterNonStop ? 0 : -1
  const oneChange = filterOneChange ? 1 : -1
  const twoChanges = filterTwoChanges ? 2 : -1
  const threeChanges = filterThreeChanges ? 3 : -1
  useEffect(() => {
    getTicket()
  }, [])

  let renderTickets = filterTickets(
    tickets,
    filterAll,
    nonStop,
    oneChange,
    twoChanges,
    threeChanges
  )
  renderTickets = sortTickets(sortName, renderTickets)
  const showTickets = renderTickets.length - renderCount > 5 ? 5 : renderTickets.length
  const ticketList = jsxTickets(renderTickets, renderCount)

  return (
    <div className={styles.ticketsList}>
      {isLoading && ticketList.length && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass={styles.loader}
          visible
        />
      )}
      {downloadError && (
        <span className={styles.err}>
          К сожалению не все билеты загрузились, обновите страницу.
        </span>
      )}
      {!ticketList.length && <span>Рейсов, подходящих под заданные фильтры, не найдено</span>}
      {ticketList}
      {Boolean(renderTickets.length) && (
        <button type="button" className={styles.button} onClick={showMoreTicket}>
          <span className={styles.span}> {`Показать еще ${showTickets} билетов`}</span>
        </button>
      )}
    </div>
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getTicket: getTickets, showMoreTicket: showMoreTickets }, dispatch)

const mapStateToProps = (state) => ({
  tickets: state.ticketsReducer.tickets,
  renderCount: state.ticketsReducer.renderCount,
  transfers: state.filterReducer.transfers,
  sortName: state.sortReducer.sortName,
  downloadError: state.ticketsReducer.downloadError,
  isLoading: state.ticketsReducer.isLoading,
})

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList)
