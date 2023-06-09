import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#A4CE57"
      d="M5.165 29.7v6.457h6.457l19.043-19.043-6.457-6.456L5.165 29.7Zm31.698-18.784L30.406 4.46 26.05 8.833l6.457 6.456 4.356-4.373Z"
    />
  </Svg>
)
export default SvgComponent
