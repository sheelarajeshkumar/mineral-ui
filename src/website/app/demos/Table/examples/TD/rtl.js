// TODO: Re-flow
import { ThemeProvider } from '../../../../../../library/themes';
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';

export default {
  id: 'rtl',
  title: 'Bidirectionality',
  description: `Table TODO`,
  scope: {
    Table,
    TBody,
    TD,
    TH,
    THead,
    TR,
    ThemeProvider
  },
  source: `
    <div dir='rtl'>
      <ThemeProvider theme={{ direction: 'rtl' }}>
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
            <TR>
              <TD textAlign='end'>Durian</TD>
              <TD>Ramps</TD>
            </TR>
          </TBody>
        </Table>
      </ThemeProvider>
    </div>`
};
