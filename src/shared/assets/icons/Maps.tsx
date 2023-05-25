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
      stroke="#A7A9AB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M12 14.666a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"
    />
    <Path
      stroke="#A7A9AB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="m23.543 22.21-5.658 5.657a2.667 2.667 0 0 1-3.769 0l-5.659-5.658a10.667 10.667 0 1 1 15.086 0Z"
    />
  </Svg>
)
export default SvgComponent
