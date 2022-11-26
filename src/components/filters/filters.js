import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { sortCheapest, sortOptimal, sortFastest } from '../../actions'

import styles from './filters.module.scss'

function Filters({ sortName, onCheapest, onFastest, onOptimal }) {
  const cheapestButton = sortName === 'cheapest' ? styles.active : ''
  const fastestButton = sortName === 'fastest' ? styles.active : ''
  const optimalButton = sortName === 'optimal' ? styles.active : ''
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={`${styles.button} ${styles.left} ${cheapestButton}`}
        onClick={onCheapest}
      >
        <span className={styles.text}>Самый дешевый</span>
      </button>
      <button type="button" className={`${styles.button} ${fastestButton}`} onClick={onFastest}>
        <span className={styles.text}>Самый быстрый</span>
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.right} ${optimalButton}`}
        onClick={onOptimal}
      >
        <span className={styles.text}>Оптимальный</span>
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  sortName: state.sortReducer.sortName,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { onCheapest: sortCheapest, onFastest: sortFastest, onOptimal: sortOptimal },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
