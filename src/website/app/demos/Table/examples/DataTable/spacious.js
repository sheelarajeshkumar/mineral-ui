/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'spacious',
  title: 'Spacious',
  description: `You can render DataTable with a more spacious appearance.`,
  scope: { DataTable, sharedRows },
  source: `
    <DataTable spacious rows={sharedRows} rowKey="Fruits" />`
};
