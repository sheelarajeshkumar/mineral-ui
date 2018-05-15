/* @flow */
// import React from 'react';
// import { shallow } from 'enzyme';
import examples from '../../../website/app/demos/Table/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

// function shallowTable(props = {}) {
//   return shallow(
//     <Table {...props}>
//
//     </Table>
//   );
// }

describe('Table', () => {
  testDemoExamples(examples);

  // it('renders', () => {
  //   const table = shallowTable();
  //
  //   expect(table.exists()).toEqual(true);
  // });
});
