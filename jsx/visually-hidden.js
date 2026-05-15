import { createElement, forwardRef } from 'react'

import { splitProps } from '../helpers.js';
import { getVisuallyHiddenStyle } from '../patterns/visually-hidden.js';
import { dreamy } from './factory.js';

export const VisuallyHidden = /* @__PURE__ */ forwardRef(function VisuallyHidden(props, ref) {
  const [patternProps, restProps] = splitProps(props, [])

const styleProps = getVisuallyHiddenStyle(patternProps)
const mergedProps = { ref, ...styleProps, ...restProps }

return createElement(dreamy.div, mergedProps)
  })