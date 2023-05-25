import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    stroke="#A4CE57"
    {...props}
  >
    <Path
      stroke="#A4CE57"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="m25.333 11.613-7.11-5.53a3.555 3.555 0 0 0-4.366 0l-7.112 5.53a3.553 3.553 0 0 0-1.372 2.807v9.6a2.667 2.667 0 0 0 2.667 2.666h16a2.667 2.667 0 0 0 2.667-2.666v-9.6a3.554 3.554 0 0 0-1.374-2.807Z"
    />
    <Path
      stroke="#A4CE57"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.667}
      d="M21.333 20c-2.946 1.777-7.722 1.777-10.666 0"
    />
  </Svg>
)
export default SvgComponent
