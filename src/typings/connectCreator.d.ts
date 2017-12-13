// This is a helper for getting types when using connect.
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237

import { Component, ComponentClass } from 'react-redux'

declare module 'react-redux' {
  export interface InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> {
    <P extends TInjectedProps>(component: Component<P>): ComponentClass<Omit<P, keyof TInjectedProps> & TNeedsProps> & {
      WrappedComponent: Component<P>;
    }

    allProps: TInjectedProps & TNeedsProps
  }
}
