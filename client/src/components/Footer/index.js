import React from 'react'
import PropTypes from 'prop-types'
import { cx } from '@emotion/css'

import * as styles from './styles'

const Footer = ({
  text = '',
  textColor,
  className,
  background,
}) => {
  if (!text) return null

  return (
    <footer className={cx(styles.footer(background), className)}>
      <div className={styles.footerInner}>
        <div className={styles.footerContent(textColor)}>{text}</div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  background: PropTypes.string,
  className: PropTypes.string,
}

export default Footer