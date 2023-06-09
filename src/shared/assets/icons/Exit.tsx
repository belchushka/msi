import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill="#A4CE57"
      fillRule="evenodd"
      d="M8.264 2.755A2.755 2.755 0 0 0 5.51 5.51v30.303a2.755 2.755 0 0 0 2.754 2.755h20.662a1.378 1.378 0 0 0 0-2.755H8.264V5.51h20.662a1.377 1.377 0 1 0 0-2.755H8.264Z"
      clipRule="evenodd"
    />
    <Path
      fill="#A4CE57"
      d="M31.748 12c.398 0 .78.163 1.062.453l6.75 6.953a1.586 1.586 0 0 1 0 2.188l-6.75 6.953a1.48 1.48 0 0 1-1.062.453 1.48 1.48 0 0 1-1.062-.453 1.571 1.571 0 0 1-.44-1.094c0-.41.159-.804.44-1.094l4.19-4.314H14.5c-.398 0-.78-.163-1.06-.452A1.57 1.57 0 0 1 13 20.5c0-.41.158-.803.44-1.093.28-.29.662-.452 1.06-.452h20.377l-4.19-4.314a1.571 1.571 0 0 1-.44-1.094c0-.41.158-.804.44-1.094A1.48 1.48 0 0 1 31.747 12Z"
    />
  </Svg>
)
export default SvgComponent
