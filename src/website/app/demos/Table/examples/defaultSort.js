/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'default-sort',
  title: 'Default Sort (w/o `sortable` on a column)',
  hideFromProd: true,
  scope: { Table, sharedData },
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
        { content: 'Fruits', key: 'Fruits' },
        { content: 'Vegetables', key: 'Vegetables' },
        { content: 'Grains', key: 'Grains' },
        { content: 'Dairy', key: 'Dairy', sortFn: sortByLength },
        { content: 'Protein', key: 'Protein' }
      ];

      return (
        <Table
          columns={columns}
          defaultSort={{ key: 'Dairy', ascending: true }}
          data={sharedData}
          rowKey="Fruits"
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
