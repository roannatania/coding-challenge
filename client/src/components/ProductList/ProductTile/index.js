import React from 'react'
import PropTypes from 'prop-types'
import { cx } from '@emotion/css'

import * as styles from './styles'

const ProductTile = ({
  description,
  source,
  sku,
  className,
}) => (
  <article className={cx(styles.productTile, className)}>
    <div className={styles.productTileInner}>
        <div className={styles.contentWrapper}>
          <p className={styles.sourceText}>Source: {source}</p>
          <h4 className={styles.descriptionText}>{description}</h4>
          <div className={styles.skuWrapper}>
            <p className={styles.skuText}>{sku}</p>
          </div>
        </div>
    </div>
  </article>
)

ProductTile.propTypes = {
  description: PropTypes.string,
  source: PropTypes.string,
  sku: PropTypes.string,
  className: PropTypes.string,
}

export default ProductTile