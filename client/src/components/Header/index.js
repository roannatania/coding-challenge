import React from 'react'
import PropTypes from 'prop-types'
import { cx } from '@emotion/css'

import * as styles from './styles'

const Header = ({
  logoImg = '',
  logoAlt = 'Logo',
  text = '',
  textColor,
  background,
  className
}) => {
  if (!logoImg) return null

  return (
    <header className={cx(styles.header(background), className)}>
      <div className={styles.headerInner}>
        <div className={styles.headerContent}>
          <a className={styles.headerLogoLink} href="/">
            <img className={styles.headerLogo} src={logoImg} alt={logoAlt} />
          </a>
          {text && <div className={styles.headerText(textColor)}>{text}</div>}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  logoImg: PropTypes.string.isRequired,
  logoAlt: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
  background: PropTypes.string,
  className: PropTypes.string,
}

export default Header