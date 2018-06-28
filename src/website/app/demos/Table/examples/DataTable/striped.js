/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'striped',
  title: 'Striped Rows',
  description: `You can render DataTable with alternately-striped rows.`,
  scope: { DataTable, sharedData },
  source: `
    <DataTable striped data={sharedData} rowKey="Fruits" />`
};
