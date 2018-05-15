/* @flow */
import { Children, cloneElement } from 'react';

export default function childrenWithProps(children: React$Node, props: Object) {
  return Children.map(children, (child) => {
    return cloneElement(child, { ...props });
  });
}
