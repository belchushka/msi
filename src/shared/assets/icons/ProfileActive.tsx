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
      d="M8 28v-2.667A5.333 5.333 0 0 1 13.333 20h5.334A5.333 5.333 0 0 1 24 25.333V28M10.667 9.333a5.334 5.334 0 1 0 10.667 0 5.334 5.334 0 0 0-10.667 0Z"
    />
  </Svg>
)
export default SvgComponent
