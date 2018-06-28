/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'high-contrast',
  title: 'High Contrast',
  description: `You can render DataTable with a high contrast appearance.`,
  scope: { DataTable, sharedData },
  source: `
    <DataTable highContrast data={sharedData} rowKey="Fruits" />`
};
