/* @flow */
import Grid, { GridItem } from '../../../../../../library/Grid';
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'title',
  title: 'Title',
  description: `Table TODO`,
  scope: {
    Grid,
    GridItem,
    Table,
    TBody,
    TD,
    TH,
    THead,
    TR
  },
  source: `
    <Grid alignItems="end" breakpoints={['57em']}>
      <GridItem span={[12, 6]} marginBottom={['lg', 0]}>
        <Table title="Delicious Foods">
          <THead>
            <TR>
              <TH>Fruits</TH>
              <TH>Vegetables</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>Pomello</TD>
              <TD>Bok Choi</TD>
            </TR>
            <TR>
              <TD>Starfruit</TD>
              <TD>Romanesco</TD>
            </TR>
            <TR>
              <TD>Durian</TD>
              <TD>Ramps</TD>
            </TR>
          </TBody>
        </Table>
      </GridItem>
      <GridItem span={[12, 6]}>
        <Table title="Delicious Foods" titleAppearance="h2">
          <THead>
            <TR>
              <TH>Fruits</TH>
              <TH>Vegetables</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>Pomello</TD>
              <TD>Bok Choi</TD>
            </TR>
            <TR>
              <TD>Starfruit</TD>
              <TD>Romanesco</TD>
            </TR>
            <TR>
              <TD>Durian</TD>
              <TD>Ramps</TD>
            </TR>
          </TBody>
        </Table>
      </GridItem>
    </Grid>`
};
