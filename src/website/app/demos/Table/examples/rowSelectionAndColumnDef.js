/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'row-selection-and-column-def',
  title: 'Row Selection with Column Definition',
  hideFromProd: true,
  scope: { Table, sharedData },
  source: `
    () => {
      const columns = [
        { content: 'Fresh Fruits', key: 'Fruits' },
        { content: 'Veritable Vegetables', key: 'Vegetables' },
        { content: 'Good Grains', key: 'Grains' },
        { content: 'Delectable Dairy', key: 'Dairy' },
        { content: 'Powerful Protein', key: 'Protein' }
      ];

      const data = [
        sharedData[0],
        sharedData[1],
        { ...sharedData[2], disabled: true },
        sharedData[3]
      ];

      const onToggle = (rows, selected) => console.log(rows, selected);

      return (
        <Table
          columns={columns}
          data={data}
          rowKey="Fruits"
          onToggleRow={onToggle}
          onToggleAllRows={onToggle}
          selectable
          selectedRows={[data[1]]}
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
