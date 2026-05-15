import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.js';
import { getTextStyle } from '../patterns/text.js';
import { dreamy } from './factory.js';

export const Text = /* @__PURE__ */ forwardRef(function Text(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["variant","size"])

const styleProps = getTextStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(dreamy.div, mergedProps)
  })