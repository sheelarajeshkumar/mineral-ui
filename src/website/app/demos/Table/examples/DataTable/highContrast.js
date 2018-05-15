/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'high-contrast',
  title: 'High Contrast',
  description: `You can render DataTable with a high contrast appearance.`,
  scope: { DataTable, sharedRows },
  source: `
    <DataTable highContrast rows={sharedRows} rowKey="Fruits" />`
};
