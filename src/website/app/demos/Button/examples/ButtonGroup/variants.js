/* @flow */
import Button, { ButtonGroup } from '../../../../../../library/Button';
import DemoLayout from '../../../shared/DemoLayout';

export default {
  id: 'variants',
  title: 'Variants',
  description: `TODO`,
  scope: { Button, ButtonGroup, DemoLayout },
  source: `
    <DemoLayout>
      <ButtonGroup
        defaultChecked="hi"
        name="mineral-2">
        <Button value="hi">Hi</Button>
        <Button value="I'm a button">I'm a Button</Button>
        <Button value="me too" variant="success">Me too</Button>
      </ButtonGroup>

      <ButtonGroup
        defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz', variant: 'success' }
        ]}
        name="mineral-1" />

      <ButtonGroup
        defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        variant="success" />

    </DemoLayout>
  `
};
