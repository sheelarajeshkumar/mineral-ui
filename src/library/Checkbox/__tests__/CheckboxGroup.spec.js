/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import CheckboxGroup from '../CheckboxGroup';
import examples from '../../../website/app/demos/Checkbox/examples/CheckboxGroup';
import testCssProps from '../../../../utils/testCssProps';
import testDemoExamples from '../../../../utils/testDemoExamples';

function shallowCheckboxGroup() {
  return shallow(<CheckboxGroup name="example" />);
}

describe('CheckboxGroup', () => {
  testDemoExamples(examples);

  testCssProps(CheckboxGroup);

  it('renders', () => {
    const checkboxGroup = shallowCheckboxGroup();

    expect(checkboxGroup.exists()).toEqual(true);
  });
});
