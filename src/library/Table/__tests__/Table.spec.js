/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table';
import examples from '../../../website/app/demos/Table/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

function shallowTable(props = {}) {
  const tableProps = {
    data: [],
    title: 'Test',
    ...props
  };
  return shallow(<Table {...tableProps} />);
}

describe('Table', () => {
  testDemoExamples(examples);

  it('renders', () => {
    const table = shallowTable();

    expect(table.exists()).toEqual(true);
  });
});
