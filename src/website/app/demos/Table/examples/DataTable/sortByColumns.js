/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'sort-by-columns',
  title: 'Sort by Columns',
  description: `Users can sort the rows in DataTable by column, enabled via the
\`enableSort\` column definition property. If the default sorting function,
below, does not work for your data, you can supply your own with the \`sortFn\`
column definition property. You can set the default sort with \`defaultSort\`.

\`\`\`
const defaultSortFn = (a: Object, b: Object, column: string) => {
  // Coerce null & undefined values to an empty string and normalize letter casing
  const normalizedValue = (value) =>
    value === null || value === undefined
      ? ''
      : typeof value === 'string' ? value.toUpperCase() : value;

  const valueA = normalizedValue(a[column]);
  const valueB = normalizedValue(b[column]);

  if (valueA < valueB) { return -1; }
  if (valueA > valueB) { return 1; }
  return 0;
};
\`\`\`

In the example below, all columns except the last one have enabled sorting and
the Dairy column has a custom sorting function to sort by length rather than
alphabetically.
`,
  scope: { DataTable, sharedData },
  source: `
    () => {
      const sortByLength = (a, b, column) => {
        const lengthA =a[column].length;
        const lengthB =b[column].length;
        if (lengthA < lengthB) { return -1; }
        if (lengthA > lengthB) { return 1; }
        return 0;
      };

      const columns = [
        { content: 'Fresh Fruits', name: 'Fruits', enableSort: true },
        { content: 'Veritable Vegetables', name: 'Vegetables', enableSort: true },
        { content: 'Grains', name: 'Grains', enableSort: true },
        { content: 'Delectable Dairy', name: 'Dairy', enableSort: true, sortComparator: sortByLength },
        { content: 'Protein', name: 'Protein' }
      ];

      return (
        <DataTable
          columns={columns}
          defaultSort={{ column: 'Fruits', direction: 'ascending' }}
          data={sharedData}
          rowKey="Fruits" />
      );
    }`
};
