/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'row-selection',
  title: 'Row Selection',
  description: `Allow users to select rows with the \`enableRowSelection\` prop.
Rows with a \`disabled\` property set to \`true\` will render a disabled
checkbox. \`onSelectRows\` is called with the selected rows when the selection
changes (most useful when [controlled](#controlled)).`,
  scope: { DataTable, sharedRows },
  source: `
    () => {
      const rows = [
        sharedRows[0],
        sharedRows[1],
        { ...sharedRows[2], disabled: true }
      ];

      return (
        <DataTable
          enableRowSelection
          defaultSelectedRows={[rows[1]]}
          rows={rows}
          rowKey="Fruits"/>
      );
    }`
};
