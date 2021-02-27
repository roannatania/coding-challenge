import { css } from '@emotion/css'

import * as colors from '../../../styles/colors'

export const productTile = css`
  background: #ffffff;
  display: block;
  width: 100%;
  box-shadow: inset 0 0 0 0.5px ${colors.greyColor};
`

export const productTileInner = css`
  width: 100%;
  height: 100%;
  padding: 20px;
`

export const contentWrapper = css`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

const textStyle = css`
  color: ${colors.blackColor};
  font-family: Arial,sans-serif;
  text-align: left;
  margin: 0;
  padding: 0;
  font-weight: normal;
`

export const sourceText = css`
  ${textStyle}
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  text-transform: uppercase;
`

export const descriptionText = css`
  ${textStyle}
  font-size: 16px;
  line-height: 24px;
`

export const skuWrapper = css`
  border-top: 1px solid ${colors.greyColor};
  padding-top: 12px;
  margin-top: 20px;
  justify-self: flex-end;
`

export const skuText = css`
  font-size: 12px;
  line-height: 26px;
  ${textStyle}
`


