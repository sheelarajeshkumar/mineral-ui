/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Table from '../Table';
import TBody from '../TBody';
import TD from '../TD';
import TR from '../TR';
import examples from '../../../website/app/demos/Table/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

function shallowTable(props = {}) {
  return shallow(
    <Table {...props}>
      <TBody>
        <TR>
          <TD />
        </TR>
      </TBody>
    </Table>
  );
}

describe('Table', () => {
  testDemoExamples(examples);

  it('renders', () => {
    const table = shallowTable();

    expect(table.exists()).toEqual(true);
  });
});
