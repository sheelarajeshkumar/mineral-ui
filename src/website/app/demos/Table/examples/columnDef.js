/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

/*
 * Unfortunately, something in the markdown -> PropTable -> react-docgen stack
 * borks on newlines in the descriptions.
 */

export default {
  id: 'column-def',
  title: 'Column Definition',
  description: `In addition to \`data\`, you can pass an array of \`column\`
definition objects, where each object contains:

<div style={{ padding: '0 1.5em' }} key={0}>
  <PropTable
    propDoc={{
      content: {
        flowType: { name: 'React$Node' },
        required: true,
        description: 'Rendered content of the column header'
      },
      label: {
        flowType: { name: 'string' },
        required: false,
        description: "If a column's \`content\` is not a string, \`label\` must be provided for accessibility purposes."
      },
      maxWidth: {
        flowType: { name: 'number, string' },
        required: false,
        description: 'Maximum width of the column. See \`width\` for more details.'
      },
      minWidth: {
        flowType: { name: 'number, string' },
        required: false,
        description: 'Minimum width of the column. See \`width\` for more details.'
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
      textAlign: {
        flowType: { name: 'boolean' },
        required: false,
        description:
          'Align the text of both the column header and the cells ([see example](#column-align))'
      },
      width: {
        flowType: { name: 'number, string' },
        required: false,
        description: 'Width of the column. \`minWidth\` takes precedence over \`maxWidth\` which takes precedence over \`width\`. If no width-related properties are defined, columns will use the width decided by the rendered \`<table>\` element.'
      },
    }} />
</div>
`,
  scope: { Table, sharedData },
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
        <Table
          columns={columns}
          data={sharedData}
          rowKey="Fruits" />
      );
    }`
};
