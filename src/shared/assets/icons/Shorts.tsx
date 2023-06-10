import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#A7A9AB"
      d="M14.024 11.321A.8.8 0 0 0 12.8 12v8.24a.801.801 0 0 0 1.242.667l6.4-4.238a.8.8 0 0 0-.016-1.344l-6.402-4.004ZM7.2 4.8a4 4 0 0 0-4 4v14.4a4 4 0 0 0 4 4h17.6a4 4 0 0 0 4-4V8.8a4 4 0 0 0-4-4H7.2Zm-2.4 4a2.4 2.4 0 0 1 2.4-2.4h17.6a2.4 2.4 0 0 1 2.4 2.4v14.4a2.4 2.4 0 0 1-2.4 2.4H7.2a2.4 2.4 0 0 1-2.4-2.4V8.8Z"
    />
  </Svg>
)
export default SvgComponent