/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'spacious',
  title: 'Spacious',
  description: `You can render Table with a more spacious appearance.`,
  scope: { Table, sharedData },
  source: `
    <Table verticalSpace="spacious" data={sharedData} rowKey="Fruits" />`
};
