/* @flow */
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
    <div dir="rtl">
      <ThemeProvider theme={{ direction: 'rtl' }}>
        <Table title="الأطعمة اللذيذة">
          <THead>
            <TR>
              <TH>ثمار</TH>
              <TH>خضروات</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD>جريب فروت</TD>
              <TD>بوك تشوي</TD>
            </TR>
            <TR>
              <TD>فاكهة النجمة</TD>
              <TD>بروكلي</TD>
            </TR>
            <TR>
              <TD>دوريان</TD>
              <TD>بامية</TD>
            </TR>
          </TBody>
        </Table>
      </ThemeProvider>
    </div>`
};
