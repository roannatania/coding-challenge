import { css, keyframes } from '@emotion/css'

import * as colors from '../../styles/colors'

export const loaderWrapper = css`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`

const bounceAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
`

export const loaderCircle = ({
  size = 20,
  color = colors.lightPrimaryColor,
  animationDelay = 0
}) => css`
  width: ${size}px;
  height: ${size}px;
  background-color: ${color};
  border-radius: 100%;
  animation: ${bounceAnimation} 1.4s infinite ease-in-out;
  ${animationDelay ? `animation-delay: ${animationDelay}s;` : null}
`