import { css } from '@emotion/css'

import * as breakpoints from '../../styles/breakpoints'

export const productList = css`
  width: 100%;

  @media (min-width: ${breakpoints.tablet}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.tablet768}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${breakpoints.laptop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`