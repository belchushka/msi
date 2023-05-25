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
      stroke="#A4CE57"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M25.333 5.333v21.333h-16A2.667 2.667 0 0 1 6.667 24V8a2.667 2.667 0 0 1 2.666-2.667h16Z"
    />
    <Path
      stroke="#A4CE57"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M25.333 21.334h-16A2.667 2.667 0 0 0 6.667 24M12 10.667h8"
    />
  </Svg>
)
export default SvgComponent
