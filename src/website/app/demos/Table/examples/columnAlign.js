/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'column-align',
  title: 'Column Alignment',
  description: `Align the text of both the column header and the cells under it
with the \`textAlign\` column definition property.`,
  scope: { Table, sharedData },
  source: `
    () => {
      const columns = [
        { content: 'Fruits', name: 'Fruits' },
        { content: 'Vegetables', name: 'Vegetables', textAlign: 'end' },
        { content: 'Grains', name: 'Grains', textAlign: 'center' },
        { content: 'Dairy', name: 'Dairy',  textAlign: 'justify' },
        { content: 'Protein', name: 'Protein' }
      ];

      return (
        <Table
          columns={columns}
          data={sharedData} />
      );
    }`
};
