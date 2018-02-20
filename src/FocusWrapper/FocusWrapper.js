/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React from 'react';
import { createStyledComponent } from '../styles';

type Props = {
  /**
   * Things around which to fake focus/hover/etc...; must include a
   * FocusWrapperChild
   */
  children: React$Node
};

const styles = {
  root: {
    alignItems: 'center',
    cursor: 'text',
    display: 'flex',
    position: 'relative',
    width: '100%'
  }
};

const Root = createStyledComponent('div', styles.root, {
  displayName: 'FocusWrapper', // TODO: Prop-driven?
  includeStyleReset: true
});

/**
 * FocusWrapper
 */
export default function FocusWrapper({ children, ...restProps }: Props) {
  return (
    <Root {...restProps}>
      {children}
      <div />
    </Root>
  );
}
