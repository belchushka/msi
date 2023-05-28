import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#F77E00"
        stroke="#fff"
        strokeWidth={2}
        d="m14.614 2.09.002.001 11.408 11.364a.725.725 0 0 1-.025 1.014l-.006.006-.005.005-11.374 11.417a.748.748 0 0 1-1.057 0L2.182 14.48l-.001-.001a.75.75 0 0 1-.03-1.03L13.556 2.091l.002-.001a.748.748 0 0 1 1.057 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h28v28H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
