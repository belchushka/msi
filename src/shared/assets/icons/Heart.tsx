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
      fill="#F8312F"
      stroke="#fff"
      strokeWidth={2}
      d="M16.504 28.418c2.762-2.1 6.575-5.911 8.789-8.125 2.111-2.111 3.478-4.893 3.647-7.422.164-2.465-.794-4.68-3.387-5.976l-9.05 21.523Zm0 0a.765.765 0 0 1-.947-.018l-.006-.005c-2.553-2.06-6.69-5.948-8.844-8.102C4.596 18.182 3.23 15.4 3.06 12.871c-.164-2.465.794-4.68 3.387-5.976l10.057 21.523Zm3.669-21.86c1.492-.574 3.322-.692 5.38.337H6.447c2.058-1.03 3.888-.911 5.38-.336A7.972 7.972 0 0 1 15.2 9.1l.8 1.067.8-1.067a7.972 7.972 0 0 1 3.373-2.541Z"
    />
  </Svg>
)
export default SvgComponent