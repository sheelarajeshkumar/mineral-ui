/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'zebra-striped',
  title: 'Zebra Striping',
  description: `You can render DataTable with zebra-striped rows.`,
  scope: { DataTable, sharedRows },
  source: `
    <DataTable zebraStriped rows={sharedRows} rowKey="Fruits" />`
};
