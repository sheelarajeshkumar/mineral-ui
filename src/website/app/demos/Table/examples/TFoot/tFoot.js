// TODO: Re-flow
import Table, {
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'basic',
  title: 'Basic Usage',
  description: `Table TODO`,
  scope: {
    Table,
    TBody,
    TD,
    TFoot,
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
        <TR>
          <TD>Starfruit</TD>
          <TD>Romanesco</TD>
        </TR>
      </TBody>
      <TFoot>
        <TR>
          <TD>2 Fruits</TD>
          <TD>2 Vegetables</TD>
        </TR>
      </TFoot>
    </Table>`
};
