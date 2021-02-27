import { css } from '@emotion/css'

import { defaultWrapperStyle } from '../../styles/wrapper'
import * as colors from '../../styles/colors'

export const footer = (background = colors.darkPrimaryColor) => css`
  width: 100%;
  background: ${background};
  padding: 20px 0;
`

export const footerInner = css`
  ${defaultWrapperStyle}
`

export const footerContent = (color = colors.lightPrimaryColor) => css`
  width: 100%;
  text-align: center;
  font-family: Arial,sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: ${color};
`