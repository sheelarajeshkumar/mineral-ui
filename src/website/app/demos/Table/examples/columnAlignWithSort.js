/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'column-align-with-sort',
  title: 'Column Alignment with Sorting',
  hideFromProd: true,
  scope: { Table, sharedData },
  source: `
    () => {
      const columns = [
        { content: 'Fruits', key: 'Fruits', sortable: true },
        { content: 'Vegetables', key: 'Vegetables', textAlign: 'end', sortable: true },
        { content: 'Grains', key: 'Grains', textAlign: 'center', sortable: true },
        { content: 'Dairy', key: 'Dairy',  textAlign: 'justify', sortable: true }
      ];

      const onSort = (sort) => console.log(sort);

      return (
        <Table
          columns={columns}
          data={sharedData}
          sort={{ key: 'Vegetables' }}
          onSort={onSort}
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
