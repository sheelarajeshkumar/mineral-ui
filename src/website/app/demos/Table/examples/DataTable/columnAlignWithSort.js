/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'column-align-with-sort',
  title: 'Column Alignment with Sorting',
  hideFromProd: true,
  scope: { DataTable, sharedRows },
  source: `
    () => {
      const columns = [
        { content: 'Fruits', name: 'Fruits', enableSort: true },
        { content: 'Vegetables', name: 'Vegetables', textAlign: 'end', enableSort: true },
        { content: 'Grains', name: 'Grains', textAlign: 'center', enableSort: true },
        { content: 'Dairy', name: 'Dairy',  textAlign: 'justify', enableSort: true }
      ];

      return (
        <DataTable
          columns={columns}
          rows={sharedRows} />
      );
    }`
};
