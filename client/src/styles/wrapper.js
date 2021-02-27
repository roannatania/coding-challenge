import { css } from '@emotion/css'

import * as breakpoints from './breakpoints'

export const defaultWrapperStyle = css`
  padding: 0 18px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 4vw;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 0;
    max-width: 1250px;
  }

  @media (min-width: ${breakpoints.xl}) {
    max-width: 1530px;
  }
`