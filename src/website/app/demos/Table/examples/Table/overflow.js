/* @flow */
import Box from '../../../../../../library/Box';
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'overflow',
  title: 'Overflow',
  description: `Table TODO`,
  scope: {
    Box,
    Table,
    TBody,
    TD,
    TH,
    THead,
    TR
  },
  source: `
    <Box width="50%">
      <Table>
        <THead>
          <TR>
            <TH>Fruits</TH>
            <TH>Vegetables</TH>
            <TH>Grains</TH>
            <TH>Dairy</TH>
            <TH>Protein</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Pomello</TD>
            <TD>Bok Choi</TD>
            <TD>Chia</TD>
            <TD>Pule</TD>
            <TD>Crickets</TD>
          </TR>
          <TR>
            <TD>Starfruit</TD>
            <TD>Romanesco</TD>
            <TD>Sorghum</TD>
            <TD>Casu marzu</TD>
            <TD>Barnacles</TD>
          </TR>
          <TR>
            <TD>Durian</TD>
            <TD>Ramps</TD>
            <TD>Teff</TD>
            <TD>Vieux Lille</TD>
            <TD>Inca nuts</TD>
          </TR>
        </TBody>
      </Table>
    </Box>`
};
