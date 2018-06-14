/* @flow */
import Button, { ButtonGroup } from '../../../../../../library/Button';
import { FormFieldDivider } from '../../../../../../library/Form';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'data-vs-children',
  title: 'Data vs. Children',
  description: `Use either the \`data\` prop or \`children\` to construct a
group of related controls.`,
  scope: { Button, ButtonGroup, DemoForm, FormFieldDivider },
  source: `
    <DemoForm>
      <ButtonGroup
        defaultChecked="quartz"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-2"
        multiSelect />

      <FormFieldDivider />

      <ButtonGroup
        defaultChecked="hi"
        name="mineral-1">
        <Button value="hi">Hi</Button>
        <Button value="I'm a button">I'm a Button</Button>
        <Button value="me too">Me too</Button>
      </ButtonGroup>
    </DemoForm>
  `
};
