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
        defaultChecked={['fluorite']}
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1" />

      <FormFieldDivider />

      <ButtonGroup
        name="mineral-2">
        <Button value="hi" defaultChecked>Hi</Button>
        <Button value="I'm a button">I'm a Button</Button>
        <Button value="me too">Me too</Button>
      </ButtonGroup>
    </DemoForm>
  `
};
