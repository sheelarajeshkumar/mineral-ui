/* @flow */
import Button from '../../../../../library/Button';
import ButtonGroup from '../../../../../library/ButtonGroup';
import { FormFieldDivider } from '../../../../../library/Form';
import DemoForm from '../components/DemoForm';

export default {
  id: 'data-vs-children',
  title: 'Data vs. Children',
  description: `Use either the \`data\` prop or \`children\` to construct a
group of related controls.`,
  scope: { Button, ButtonGroup, DemoForm, FormFieldDivider },
  source: `
    <DemoForm>
      <ButtonGroup
        multiSelect
        // defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite', defaultChecked:true },
          { label: 'Magnetite', value: 'magnetite', defaultChecked:true },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1" />

      <FormFieldDivider />

      <ButtonGroup
        multiSelect
        name="mineral-2" >
        <Button value="hi">Hi</Button>
        <Button value="I'm a button" defaultChecked>I'm a Button</Button>
        <Button value="me too" defaultChecked>Me too</Button>
      </ButtonGroup>
    </DemoForm>
  `
};
