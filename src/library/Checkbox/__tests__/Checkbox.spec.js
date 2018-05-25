/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../Checkbox';
import examples from '../../../website/app/demos/Checkbox/examples';
import testCssProps from '../../../../utils/testCssProps';
import testDemoExamples from '../../../../utils/testDemoExamples';

function shallowCheckbox() {
  return shallow(<Checkbox label="example" />);
}

describe('Checkbox', () => {
  testDemoExamples(examples);

  testCssProps(Checkbox);

  it('renders', () => {
    const checkbox = shallowCheckbox();

    expect(checkbox.exists()).toEqual(true);
  });
});
