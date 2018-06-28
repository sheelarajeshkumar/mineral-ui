/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'default-sort',
  title: 'Default Sort (w/o `enableSort` on a column)',
  hideFromProd: true,
  scope: { DataTable, sharedData },
  source: `
    () => {
      const sortByLength = (a, b, column) => {
        const lengthA = a[column].length;
        const lengthB = b[column].length;
        if (lengthA < lengthB) { return -1; }
        if (lengthA > lengthB) { return 1; }
        return 0;
      };

      const columns = [
        { content: 'Fruits', name: 'Fruits' },
        { content: 'Vegetables', name: 'Vegetables' },
        { content: 'Grains', name: 'Grains' },
        { content: 'Dairy', name: 'Dairy', sortFn: sortByLength },
        { content: 'Protein', name: 'Protein' }
      ];

      return (
        <DataTable
          columns={columns}
          defaultSort={{ column: 'Dairy', direction: 'ascending' }}
          data={sharedData}
          rowKey="Fruits" />
      );
    }`
};
