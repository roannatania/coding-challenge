import React from 'react'
import PropTypes from 'prop-types'
import { cx } from '@emotion/css'

import * as styles from './styles'

const Loader = ({
  color,
  size = 20,
  className
}) => (
  <div className={cx(styles.loaderWrapper, className)}>
    <div className={styles.loaderCircle({
      size,
      color,
      animationDelay: '-0.32'
    })} />
    <div className={styles.loaderCircle({
      size,
      color,
      animationDelay: '-0.16'
    })} />
    <div className={styles.loaderCircle({
      size,
      color
    })} />
  </div>
)

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
}

export default Loader