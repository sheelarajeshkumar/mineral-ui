/* @flow */
import { ButtonGroup, RadioButton } from '../../../../../../library/Button';
import { FormFieldDivider } from '../../../../../../library/Form';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'data-vs-children',
  title: 'Data vs. Children',
  description: `Use either the \`data\` prop or \`children\` to construct a
group of related controls.`,
  scope: { DemoForm, FormFieldDivider, ButtonGroup, RadioButton },
  source: `
    <DemoForm>
      <ButtonGroup type="radio"
        name="mineral-1"
        defaultChecked="quartz"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]} />

      <FormFieldDivider />

      <ButtonGroup defaultChecked="hi" name="mineral-2" size="jumbo" type="radio">
        <RadioButton value="hi">Hi</RadioButton>
        <RadioButton>I'm a Button</RadioButton>
        <RadioButton>Me too</RadioButton>
      </ButtonGroup>
    </DemoForm>
  `
};
