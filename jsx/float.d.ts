/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { FloatProperties } from '../patterns/float';
import type { HTMLDreamyProps } from '../types/jsx';
import type { DistributiveOmit } from '../types/system-types';

export interface FloatProps extends FloatProperties, DistributiveOmit<HTMLDreamyProps<'div'>, keyof FloatProperties > {}


export declare const Float: FunctionComponent<FloatProps>