/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { WrapProperties } from '../patterns/wrap';
import type { HTMLDreamyProps } from '../types/jsx';
import type { DistributiveOmit } from '../types/system-types';

export interface WrapProps extends WrapProperties, DistributiveOmit<HTMLDreamyProps<'div'>, keyof WrapProperties > {}


export declare const Wrap: FunctionComponent<WrapProps>