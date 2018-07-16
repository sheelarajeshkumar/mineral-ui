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
      const sortByLength = (a, b, key) => {
        const lengthA = a[key].length;
        const lengthB = b[key].length;
        if (lengthA < lengthB) { return -1; }
        if (lengthA > lengthB) { return 1; }
        return 0;
      };

      const columns = [
        { content: 'Fruits', key: 'Fruits' },
        { content: 'Vegetables', key: 'Vegetables' },
        { content: 'Grains', key: 'Grains' },
        { content: 'Dairy', key: 'Dairy', sortComparator: sortByLength },
        { content: 'Protein', key: 'Protein' }
      ];

      return (
        <Table
          columns={columns}
          defaultSort={{ key: 'Dairy', descending: true }}
          data={sharedData}
          rowKey="Fruits"
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
