/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'row-selection-and-column-def',
  title: 'Row Selection with Column Definition',
  hideFromProd: true,
  scope: { DataTable, sharedData },
  source: `
    () => {
      const columns = [
        { content: 'Fresh Fruits', name: 'Fruits' },
        { content: 'Veritable Vegetables', name: 'Vegetables' },
        { content: 'Good Grains', name: 'Grains' },
        { content: 'Delectable Dairy', name: 'Dairy' },
        { content: 'Powerful Protein', name: 'Protein' }
      ];

      const rows = [
        sharedData[0],
        sharedData[1],
        { ...sharedData[2], disabled: true },
        sharedData[3]
      ];

      return (
        <DataTable
          columns={columns}
          data={data}
          rowKey="Fruits"
          enableRowSelection
          defaultSelectedRows={[rows[1]]} />
      );
    }`
};
