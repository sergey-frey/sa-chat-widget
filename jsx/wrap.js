import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.js';
import { getWrapStyle } from '../patterns/wrap.js';
import { dreamy } from './factory.js';

export const Wrap = /* @__PURE__ */ forwardRef(function Wrap(props, ref) {
  const [patternProps, restProps] = splitProps(props, ["gap","rowGap","columnGap","align","justify"])

const styleProps = getWrapStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(dreamy.div, mergedProps)
  })