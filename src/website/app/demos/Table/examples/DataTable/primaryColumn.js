/* @flow */
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'primary-column',
  title: 'Primary Column',
  // TODO: Edit to make it contextual requirements clear
  description: `It's recommended to identify a column as the primary column
(typically the first in the \`columns\` array) with the \`primary\` column
definition property. This will render cells in that column as
\`<th scope="row">\`, which can provide helpful context to users of some
Assistive Technology (AT).`,
  scope: { DataTable, sharedData },
  source: `
    () => {
      // TODO: Different data for this example? All examples?

      const columns = [
        { content: 'Fruits', name: 'Fruits', primary: true },
        { content: 'Vegetables', name: 'Vegetables' },
        { content: 'Grains', name: 'Grains' },
        { content: 'Dairy', name: 'Dairy' },
        { content: 'Protein', name: 'Protein' }
      ];

      return (
        <DataTable
          columns={columns}
          data={sharedData} />
      );
    }`
};
