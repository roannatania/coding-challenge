import { css } from '@emotion/css'

import { defaultWrapperStyle } from '../../styles/wrapper'
import * as breakpoints from '../../styles/breakpoints'
import * as colors from '../../styles/colors'

export const header = (background = colors.primaryColor) => css`
  width: 100%;
  background: ${background};
  padding: 20px 0;
`

export const headerInner = css`
  ${defaultWrapperStyle}
`

export const headerContent = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

export const headerLogoLink = css`
  unset: all;
  display: block;
  cursor: pointer;
  text-decoration: none;
  max-width: 100px;
  margin-right: 8px;


  @media (min-width: ${breakpoints.tablet768}) {
    max-width: 150px;
    margin-right: 20px;
  }
`

export const headerLogo = css`
  width: 100%;
  height: auto;
  display: block;
`

export const headerText = (color = '#ffffff') => css`
  font-family: Arial,sans-serif;
  font-size: 18px;
  line-height: 28px;
  text-align: right;
  color: ${color};
  letter-spacing: 1.5px;

  @media (min-width: ${breakpoints.tablet768}) {
    font-size: 24px;
    line-height: 36px;
  }
`

