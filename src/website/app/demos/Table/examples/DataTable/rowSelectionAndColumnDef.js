/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'row-selection-and-column-def',
  title: 'Row Selection with Column Definition',
  hideFromProd: true,
  scope: { DataTable, sharedRows },
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
        sharedRows[0],
        sharedRows[1],
        { ...sharedRows[2], disabled: true },
        sharedRows[3]
      ];

      return (
        <DataTable
          columns={columns}
          rows={rows}
          rowKey="Fruits"
          enableRowSelection
          defaultSelectedRows={[rows[1]]} />
      );
    }`
};
