import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#A4CE57"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 19v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M3 5a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
    />
  </Svg>
)
export default SvgComponent
