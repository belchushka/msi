import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={15}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M16.16 4.962a1.249 1.249 0 0 0-.796-.274c-.298 0-.584.098-.795.274L9 9.602l-5.569-4.64A1.254 1.254 0 0 0 2.64 4.7c-.295.002-.577.1-.786.275a.868.868 0 0 0-.33.654.861.861 0 0 0 .317.66l6.364 5.303c.21.176.497.275.795.275.298 0 .584-.099.795-.275l6.365-5.303a.866.866 0 0 0 .329-.663.866.866 0 0 0-.33-.663Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M18 15V0H0v15z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
