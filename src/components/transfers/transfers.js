import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  filterAll,
  filterNonStop,
  filterOneChange,
  filterTwoChanges,
  filterThreeChanges,
} from '../../actions'

import styles from './transfers.module.scss'

function Transfers({ transfers, onAll, onNonStop, onOneChange, onTwoChanges, onThreeChanges }) {
  return (
    <div className={styles.transfers}>
      <h4>Количество пересадок</h4>
      <label className={styles.label}>
        <input type="checkbox" name="all" onChange={onAll} checked={transfers.filterAll} />
        Все
      </label>
      <label className={styles.label}>
        <input
          type="checkbox"
          name="nonStop"
          onChange={onNonStop}
          checked={transfers.filterNonStop}
        />
        Без пересадок
      </label>
      <label className={styles.label}>
        <input
          type="checkbox"
          name="oneChange"
          onChange={onOneChange}
          checked={transfers.filterOneChange}
        />
        1 пересадка
      </label>
      <label className={styles.label}>
        <input
          type="checkbox"
          name="twoChanges"
          onChange={onTwoChanges}
          checked={transfers.filterTwoChanges}
        />
        2 пересадки
      </label>
      <label className={styles.label}>
        <input
          type="checkbox"
          name="threeChanges"
          onChange={onThreeChanges}
          checked={transfers.filterThreeChanges}
        />
        3 пересадки
      </label>
    </div>
  )
}

const mapStateToProps = (state) => ({
  transfers: state.filterReducer.transfers,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onAll: filterAll,
      onNonStop: filterNonStop,
      onOneChange: filterOneChange,
      onTwoChanges: filterTwoChanges,
      onThreeChanges: filterThreeChanges,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Transfers)
