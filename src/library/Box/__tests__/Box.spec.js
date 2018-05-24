/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import testCssProps from '../../../../utils/testCssProps';
import testDemoExamples from '../../../../utils/testDemoExamples';
import Box from '../Box';
import examples from '../../../website/app/demos/Box/examples';

function shallowBox(props = {}) {
  return shallow(<Box {...props} />);
}

describe('Box', () => {
  testDemoExamples(examples);

  testCssProps(Box);

  it('renders', () => {
    const box = shallowBox();

    expect(box.exists()).toEqual(true);
  });
});
