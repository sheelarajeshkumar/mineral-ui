/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'row-selection',
  title: 'Row Selection',
  description: `Allow users to select rows with the \`enableRowSelection\` prop.
Rows with a \`disabled\` property set to \`true\` will render a disabled
checkbox. \`onToggleRow\` and \`onToggleAllRows\` callbacks are also available.`,
  scope: { Table, sharedData },
  source: `
    () => {
      const data = [
        sharedData[0],
        sharedData[1],
        { ...sharedData[2], disabled: true }
      ];

      return (
        <Table
          enableRowSelection
          selectedRows={[data[1]]}
          data={data}
          rowKey="Fruits"
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
