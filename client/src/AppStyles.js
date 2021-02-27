import { css, injectGlobal } from '@emotion/css'

import { defaultWrapperStyle } from './styles/wrapper'
import * as breakpoints from './styles/breakpoints'
import * as colors from './styles/colors'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    display: grid;
  }
`

export const mainWrapper = css`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`

export const body = css`
  width: 100%;
  margin: 20px auto;

  @media (min-width: ${breakpoints.tablet}) {
    margin: 40px auto;
  }

  @media (min-width: ${breakpoints.laptop}) {
    margin: 80px auto;
  }
`

export const bodyInner = css`
  ${defaultWrapperStyle}
  height: 100%;
`

const textStyle = css`
  font-family: Arial,sans-serif;
  text-align: center;
  padding: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  margin: 20px 0;

  @media (min-width: ${breakpoints.tablet768}) {
    margin: 40px 0;
  }
`

export const doneMessage = css`
  color: ${colors.blackColor};
  ${textStyle}
`

export const errorMessage = css`
  color: ${colors.redColor};
  ${textStyle}
`