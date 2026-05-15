/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { StackProperties } from '../patterns/stack';
import type { HTMLDreamyProps } from '../types/jsx';
import type { DistributiveOmit } from '../types/system-types';

export interface StackProps extends StackProperties, DistributiveOmit<HTMLDreamyProps<'div'>, keyof StackProperties > {}


export declare const Stack: FunctionComponent<StackProps>