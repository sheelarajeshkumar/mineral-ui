/* @flow */
import IconCloud from 'mineral-ui-icons/IconCloud';
import Button, { ButtonGroup } from '../../../../../../library/Button';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'icons',
  title: 'Icons',
  description: `Buttons within ButtonGroup can contain [Icons](/components/icon),
  just as they do in [Button](/components/button#icons)`,
  scope: { Button, ButtonGroup, DemoForm, IconCloud },
  source: `
    <DemoForm>
      <ButtonGroup name="icons">
        <Button iconStart={<IconCloud />} value="start">Start icon</Button>
        <Button iconEnd={<IconCloud />} value="end">End icon</Button>
        <Button iconStart={<IconCloud />}
          iconEnd={<IconCloud />}
          value="both">Both icons</Button>
      </ButtonGroup>
    </DemoForm>
  `
};
