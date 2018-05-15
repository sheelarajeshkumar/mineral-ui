/* @flow */
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'is-selected',
  title: 'Selected',
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
          <TH>Vegetables</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TD>Pomello</TD>
          <TD>Bok Choi</TD>
        </TR>
        <TR isSelected>
          <TD>Starfruit</TD>
          <TD>Romanesco</TD>
        </TR>
        <TR>
          <TD>Durian</TD>
          <TD>Ramps</TD>
        </TR>
      </TBody>
    </Table>`
};
