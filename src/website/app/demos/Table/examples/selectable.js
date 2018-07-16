/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'selectable',
  title: 'Row Selection',
  description: `Allow users to select rows with the \`selectable\` prop.
Rows with a \`disabled\` property set to \`true\` will render a disabled
checkbox. You can set the selected rows with the \`selectedRows\` prop, and
\`onToggleRow\` and \`onToggleAllRows\` callbacks are also available.`,
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
          selectable
          selectedRows={[data[1]]}
          data={data}
          rowKey="Fruits"
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
