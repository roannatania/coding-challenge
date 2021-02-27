import React from 'react'
import PropTypes from 'prop-types'
import { cx } from '@emotion/css'

import ProductTile from './ProductTile'

import * as styles from './styles'

const ProductList = ({
  productCatalog = [],
  className
}) => (
  <div className={cx(styles.productList, className)}>
    {productCatalog.map(product => (
      <ProductTile
        description={product?.Description}
        sku={product?.SKU}
        source={product?.Source}
      />
    ))}
  </div>
)

ProductList.propTypes = {
  productCatalog: PropTypes.arrayOf(PropTypes.shape({
    SKU: PropTypes.string,
    Description: PropTypes.string,
    Source: PropTypes.string
  })),
  className: PropTypes.string
}

export default ProductList