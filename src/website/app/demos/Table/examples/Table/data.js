/* @flow */
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'data',
  title: 'Build from Data',
  description: `Table TODO`,
  scope: {
    Table,
    TBody,
    TD,
    TH,
    THead,
    TR
  },
  source: `
    () => {
      const columns = [
        { content: 'Vegetables', name: 'name', primary: true },
        { content: 'Count', name: 'count', textAlign: 'end' }
      ]

      const rows = [
        { name: 'Pomello', count: 4 },
        { name: 'Starfruit', count: 3 },
        { name: 'Durian', count: 6 }
      ];

      return (
        <Table columns={columns} rows={rows} />
      );
    }`
};
