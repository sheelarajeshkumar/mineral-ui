/* @flow */
import { ThemeProvider } from '../../../../../../library/themes';
import Button, { ButtonGroup } from '../../../../../../library/Button';
import IconBackspace from 'mineral-ui-icons/IconBackspace';

export default {
  id: 'rtl',
  title: 'Bidirectionality',
  description: `ButtonGroups support right-to-left (RTL) languages.
Buttons within ButtonGroup behave like [Button](/components/button#rtl) (Icons are reversed when the \`direction\` theme variable is set to \`rtl\`.
A subset of Icons that [convey directionality](/components/icon#rtl) will be reversed).`,
  scope: { Button, ButtonGroup, IconBackspace, ThemeProvider },
  source: `
    <div dir="rtl">
      <ThemeProvider theme={{ direction: 'rtl' }}>
        <ButtonGroup defaultChecked={['button-1', 'button-2']} name="rtl-buttons" multiSelect>
          <Button iconStart={<IconBackspace />} value="button-1">قم بعمل ما</Button>
          <Button iconStart={<IconBackspace />} value="button-2">قم بعمل ما</Button>
          <Button iconStart={<IconBackspace />} value="button-3">قم بعمل ما</Button>
        </ButtonGroup>
      </ThemeProvider>
    </div>`
};
