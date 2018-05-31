/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Root from '../Root';

function shallowRoot(props = {}) {
  return shallow(<Root {...props} />);
}

describe('Root', () => {
  it('renders', () => {
    const root = shallowRoot();

    expect(root.exists()).toEqual(true);
  });
});
