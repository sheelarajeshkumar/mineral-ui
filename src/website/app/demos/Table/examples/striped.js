/* @flow */
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'striped',
  title: 'Striped Rows',
  description: `You can render Table with alternately-striped rows.`,
  scope: { Table, sharedData },
  source: `
    <Table striped data={sharedData} rowKey="Fruits" />`
};
