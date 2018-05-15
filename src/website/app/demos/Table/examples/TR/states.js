/* @flow */
import { simulate } from 'glamor';
import Grid, { GridItem } from '../../../../../../library/Grid';
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'states',
  title: 'States',
  hideFromProd: true,
  hideSource: true,
  scope: {
    simulate,
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
    () => {
      const table = (title, highContrast, zebraStriped) => (
        <Table highContrast={highContrast} zebraStriped={zebraStriped}>
          <THead>
            <TR>
              <TH>{title}</TH>
            </TR>
          </THead>
          <TBody>
            <TR isSelected>
              <TD>Cell</TD>
            </TR>
            <TR>
              <TD>Cell</TD>
            </TR>
            <TR isSelected>
              <TD>Cell</TD>
            </TR>
            <TR>
              <TD>Cell</TD>
            </TR>
            <TR isSelected>
              <TD>Cell</TD>
            </TR>
            <TR isSelected>
              <TD>Cell</TD>
            </TR>
            <TR>
              <TD>Cell</TD>
            </TR>
            <TR {...simulate('hover')}>
              <TD>Hover</TD>
            </TR>
            <TR isSelected {...simulate('hover')}>
              <TD>Hover</TD>
            </TR>
            <TR>
              <TD>Cell</TD>
            </TR>
            <TR isSelected>
              <TD>Cell</TD>
            </TR>
          </TBody>
        </Table>
      );

      return (
        <Grid alignItems="end">
          <GridItem>{table('Default')}</GridItem>
          <GridItem>{table('High Contrast', true)}</GridItem>
          <GridItem>{table('Zebra', undefined, true)}</GridItem>
          <GridItem>{table('High Contrast & Zebra', true, true)}</GridItem>
        </Grid>
      );
    }`
};
