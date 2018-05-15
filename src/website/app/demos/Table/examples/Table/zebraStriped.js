/* @flow */
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'zebra-striped',
  title: 'Zebra Striping',
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
    <Table zebraStriped>
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
          <TD>Rambutan</TD>
          <TD>Romanesco</TD>
        </TR>
        <TR>
          <TD>Durian</TD>
          <TD>Ramps</TD>
        </TR>
        <TR>
          <TD>Persimmons</TD>
          <TD>Fiddleheads</TD>
        </TR>
        <TR>
          <TD>Cashews</TD>
          <TD>Sunchoke</TD>
        </TR>
      </TBody>
    </Table>`
};
