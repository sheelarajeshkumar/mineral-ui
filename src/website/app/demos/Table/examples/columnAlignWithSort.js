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
        { content: 'Fruits', key: 'Fruits', enableSort: true },
        { content: 'Vegetables', key: 'Vegetables', textAlign: 'end', enableSort: true },
        { content: 'Grains', key: 'Grains', textAlign: 'center', enableSort: true },
        { content: 'Dairy', key: 'Dairy',  textAlign: 'justify', enableSort: true }
      ];

      return (
        <Table
          columns={columns}
          data={sharedData}
          defaultSort={{ key: 'Vegetables', ascending: true }}
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
