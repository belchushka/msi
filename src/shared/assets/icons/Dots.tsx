import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M14.667 16a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0Zm0 9.334a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0Zm0-18.667a1.333 1.333 0 1 0 2.666 0 1.333 1.333 0 0 0-2.666 0Z"
    />
  </Svg>
)
export default SvgComponent