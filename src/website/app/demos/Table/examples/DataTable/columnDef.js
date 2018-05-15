/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'column-def',
  title: 'Column Definition',
  description: `In addition to \`rows\`, you can pass a \`columns\` definition
of an array of column objects, where each object contains:

<PropTable
  propDoc={{
    content: {
      flowType: { name: 'React$Node' },
      required: true,
      description: 'Rendered content of the column header'
    },
    enableSort: {
      flowType: { name: 'boolean' },
      required: false,
      description: 'Enable column to be sorted ([see example](#sort-by-columns))'
    },
    name: {
      flowType: { name: 'string' },
      required: true,
      description: 'Used to look up the rendered property in your row(s)'
    },
    primary: {
      flowType: { name: 'boolean' },
      required: false,
      description:
        'Render cells in the column as \`<th scope="row" />\` ([see example](#primary-column))'
    },
    sortFn: {
      flowType: { name: '(a: Row, b: Row, column: string) => -1 | 1 | 0' },
      required: false,
      description:
        'Define a custom [comparator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description) for the column ([see example](#sort-by-columns))'
    },
    textAlign: {
      flowType: { name: 'boolean' },
      required: false,
      description:
        'Align the text of both the column header and the cells ([see example](#column-align))'
    }
  }} />
`,
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

      return (
        <DataTable
          columns={columns}
          rows={sharedRows}
          rowKey="Fruits" />
      );
    }`
};
