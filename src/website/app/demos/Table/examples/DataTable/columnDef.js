/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

/*
 * Unfortunately, something in the markdown -> PropTable -> react-docgen stack
 * borks on newlines in the descriptions.
 */
// prettier-ignore
const columnWidthDisclaimer = `\`minWidth\` takes precedence over \`maxWidth\` which takes precedence over \`width\`. If no width-related properties are defined, columns will use the width decided by the rendered \`<table>\` element.`;

export default {
  id: 'column-def',
  title: 'Column Definition',
  description: `In addition to \`rows\`, you can pass a \`columns\` definition
of an array of column objects, where each object contains:

<div style={{ padding: '0 1.5em' }} key={0}>
  <PropTable
    propDoc={{
      cell: {
        flowType: { name: 'RenderFn' },
        required: false,
        description:
          'Provides custom rendering control for the cells in the column. See the [custom cell example](#custom-cell) and [React docs](https://reactjs.org/docs/render-props.html).'
      },
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
      header: {
        flowType: { name: 'RenderFn' },
        required: false,
        description:
          'Provides custom rendering control for the column header. See the [custom column header example](#custom-column-header) and [React docs](https://reactjs.org/docs/render-props.html).'
      },
      label: {
        flowType: { name: 'string' },
        required: false,
        description: "If a column's \`content\` is not a string, label must be provided for accessibility purposes."
      },
      maxWidth: {
        flowType: { name: 'number, string' },
        required: false,
        description: 'Maximum width of the column. ${columnWidthDisclaimer}'
      },
      minWidth: {
        flowType: { name: 'number, string' },
        required: false,
        description: 'Minimum width of the column. ${columnWidthDisclaimer}'
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
      },
      width: {
        flowType: { name: 'number, string' },
        required: false,
        description: 'Width of the column. ${columnWidthDisclaimer}'
      },
    }} />
</div>
`,
  scope: { DataTable, sharedData },
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
          data={sharedData}
          rowKey="Fruits" />
      );
    }`
};
