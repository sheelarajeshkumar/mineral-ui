/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'high-contrast',
  title: 'High Contrast',
  description: `You can render Table with a high contrast appearance.`,
  scope: { Table, sharedData },
  source: `
    <Table highContrast data={sharedData} rowKey="Fruits" />`
};
