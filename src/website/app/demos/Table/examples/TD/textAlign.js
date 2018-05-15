/* @flow */
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'text-align',
  title: 'Horizontal Alignment',
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
    <Table>
      <THead>
        <TR>
          <TH>Fruits</TH>
          <TH textAlign="center">Vegetables</TH>
          <TH textAlign="end">Grains</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TD>Pomello</TD>
          <TD textAlign="center">Bok Choi</TD>
          <TD textAlign="end">Chia</TD>
        </TR>
        <TR>
          <TD>Starfruit</TD>
          <TD textAlign="center">Romanesco</TD>
          <TD textAlign="end">Sorghum</TD>
        </TR>
      </TBody>
    </Table>`
};
