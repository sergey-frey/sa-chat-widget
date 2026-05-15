/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { SpacerProperties } from '../patterns/spacer';
import type { HTMLDreamyProps } from '../types/jsx';
import type { DistributiveOmit } from '../types/system-types';

export interface SpacerProps extends SpacerProperties, DistributiveOmit<HTMLDreamyProps<'div'>, keyof SpacerProperties > {}


export declare const Spacer: FunctionComponent<SpacerProps>