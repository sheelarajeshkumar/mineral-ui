/* @flow */
import Grid, { GridItem } from '../../../../../../library/Grid';
import { DataTable } from '../../../../../../library/Table';
import sharedRows from '../shared/data';

export default {
  id: 'title',
  title: 'Title',
  description: `Display a title for your DataTable with the \`title\` prop. You
  can adjust the appearance (\`titleAppearance\`) and the rendered HTML element
  (\`titleElement\`).`,
  scope: { DataTable, Grid, GridItem, sharedRows },
  source: `
    <Grid alignItems="end" breakpoints={['57em']}>
      <GridItem span={[12, 6]} marginBottom={['lg', 0]}>
        <DataTable
          title="Delicious Foods"
          rows={sharedRows}
          rowKey="Fruits"/>
      </GridItem>
      <GridItem span={[12, 6]}>
        <DataTable
          title="Delicious Foods"
          titleAppearance="h2"
          titleElement="h3"
          rows={sharedRows}
          rowKey="Fruits"/>
      </GridItem>
    </Grid>`
};
