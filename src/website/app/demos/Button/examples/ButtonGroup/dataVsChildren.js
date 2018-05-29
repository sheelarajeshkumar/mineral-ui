/* @flow */
import Button, { ButtonGroup } from '../../../../../../library/Button';
import { FormFieldDivider } from '../../../../../../library/Form';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'data-vs-children',
  title: 'Data vs. Children',
  description: `Use either the \`data\` prop or \`children\` to construct a
group of related controls.`,
  scope: { DemoForm, FormFieldDivider, ButtonGroup, Button },
  source: `
    <DemoForm>
      <ButtonGroup
        name="mineral-1"
        defaultChecked="quartz"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]} />

      <FormFieldDivider />

      <ButtonGroup name="mineral-2" defaultChecked="pyrite">
        <Button label="Azurite" value="azurite" />
        <Button label="Hematite" value="hematite" />
        <Button label="Pyrite" value="pyrite" />
      </ButtonGroup>
    </DemoForm>
  `
};
