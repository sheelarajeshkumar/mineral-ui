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

      return (
        <Table
          columns={columns}
          data={data}
          rowKey="Fruits"
          enableRowSelection
          defaultSelectedRows={[data[1]]}
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
