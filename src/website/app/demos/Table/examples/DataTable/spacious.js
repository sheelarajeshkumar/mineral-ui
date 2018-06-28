/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'spacious',
  title: 'Spacious',
  description: `You can render DataTable with a more spacious appearance.`,
  scope: { DataTable, sharedData },
  source: `
    <DataTable spacious data={sharedData} rowKey="Fruits" />`
};
