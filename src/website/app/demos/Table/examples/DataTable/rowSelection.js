/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'row-selection',
  title: 'Row Selection',
  description: `Allow users to select rows with the \`enableRowSelection\` prop.
Rows with a \`disabled\` property set to \`true\` will render a disabled
checkbox. \`onSelectRows\` is called with the selected rows when the selection
changes (most useful when [controlled](#controlled)).`,
  scope: { DataTable, sharedData },
  source: `
    () => {
      const data = [
        sharedData[0],
        sharedData[1],
        { ...sharedData[2], disabled: true }
      ];

      return (
        <DataTable
          enableRowSelection
          defaultSelectedRows={[data[1]]}
          data={data}
          rowKey="Fruits"/>
      );
    }`
};
