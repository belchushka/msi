import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke="#A7A9AB"
      strokeWidth={2.667}
      d="M16 17.333a5.333 5.333 0 1 0 0-10.666 5.333 5.333 0 0 0 0 10.666Zm0 0a8 8 0 0 0-8 8v4m8-12a8 8 0 0 1 8 8v4M17.333 6.667c.539-2.22 2.687-4 5.334-4C25.563 2.667 27.973 5.053 28 8c-.027 2.947-2.437 5.333-5.333 5.333m0 0h-1.334m1.334 0c4.384 0 8 3.582 8 8V24m-16-17.334c-.539-2.218-2.687-4-5.334-4C6.437 2.667 4.027 5.053 4 8c.027 2.947 2.437 5.333 5.333 5.333m0 0h1.334m-1.334 0c-4.384 0-8 3.582-8 8V24"
    />
  </Svg>
);
export default SvgComponent;
