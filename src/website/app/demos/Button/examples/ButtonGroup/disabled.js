/* @flow */
import Button, { ButtonGroup } from '../../../../../../library/Button';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'disabled',
  title: 'Disabled',
  description: `Use \`disabled\` to indicate that a Button is not
available for interaction. Functionality may be achieved via a property within
the \`data\` prop object, a prop on a nested Button or a prop on the whole ButtonGroup. TODO: Reword`,
  scope: { Button, ButtonGroup, DemoForm },
  source: `
    <DemoForm>
      <ButtonGroup
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite', disabled: true },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1" />

      <ButtonGroup name="mineral-2">
        <Button value="hi">Hi</Button>
        <Button value="I'm a button">I'm a Button</Button>
        <Button value="me too" disabled>Me too</Button>
      </ButtonGroup>

      <ButtonGroup
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-3"
        disabled />

    </DemoForm>
  `
};
