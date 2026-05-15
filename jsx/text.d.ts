/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { TextProperties } from '../patterns/text';
import type { HTMLDreamyProps } from '../types/jsx';
import type { DistributiveOmit } from '../types/system-types';

export interface TextProps extends TextProperties, DistributiveOmit<HTMLDreamyProps<'div'>, keyof TextProperties > {}


export declare const Text: FunctionComponent<TextProps>