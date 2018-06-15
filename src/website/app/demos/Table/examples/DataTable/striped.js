/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'striped',
  title: 'Striped Rows',
  description: `You can render DataTable with alternately-striped rows.`,
  scope: { DataTable, sharedRows },
  source: `
    <DataTable striped rows={sharedRows} rowKey="Fruits" />`
};
