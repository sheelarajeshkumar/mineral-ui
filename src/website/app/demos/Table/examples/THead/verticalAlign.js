/* @flow */
import Table, {
  TBody,
  TD,
  TH,
  THead,
  TR
} from '../../../../../../library/Table';
// $FlowFixMe: TODO
import DemoLayout from '../../../shared/DemoLayout';

export default {
  id: 'vertical-align',
  title: 'Vertical Alignment',
  description: `Table TODO`,
  scope: {
    DemoLayout,
    Table,
    TBody,
    TD,
    TH,
    THead,
    TR
  },
  source: `
    <DemoLayout marginBottom="2rem">
      <Table>
        <THead>
          <TR>
            <TH>Fruits<br/>are full of healthy sugars</TH>
            <TH>Vegetables</TH>
            <TH>Grains</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Pomello</TD>
            <TD>Bok Choi</TD>
            <TD>Chia</TD>
          </TR>
        </TBody>
      </Table>
      <Table>
        <THead verticalAlign="center">
          <TR>
            <TH>Fruits<br/>are full of healthy sugars</TH>
            <TH>Vegetables</TH>
            <TH>Grains</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Pomello</TD>
            <TD>Bok Choi</TD>
            <TD>Chia</TD>
          </TR>
        </TBody>
      </Table>
      <Table>
        <THead verticalAlign="top">
          <TR>
            <TH>Fruits<br/>are full of healthy sugars</TH>
            <TH>Vegetables</TH>
            <TH>Grains</TH>
          </TR>
        </THead>
        <TBody>
          <TR>
            <TD>Pomello</TD>
            <TD>Bok Choi</TD>
            <TD>Chia</TD>
          </TR>
        </TBody>
      </Table>
  </DemoLayout>`
};
