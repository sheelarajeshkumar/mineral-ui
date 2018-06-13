/* @flow */
import Button, { ButtonGroup } from '../../../../../../library/Button';
import { FormFieldDivider } from '../../../../../../library/Form';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'data-vs-children',
  title: 'Data vs. Children',
  description: `Use either the \`data\` prop or \`children\` to construct a
group of related controls.`,
  scope: { DemoForm, FormFieldDivider, Button, ButtonGroup },
  source: `
    <div>
    <DemoForm>
      <ButtonGroup
        defaultChecked="hi"
        name="mineral-2">
        <Button value="hi">Hi</Button>
        <Button disabled value="I'm a button">I'm a Button</Button>
        <Button value="me too" variant="danger">Me too</Button>
      </ButtonGroup>

      <FormFieldDivider />

      <ButtonGroup
        defaultChecked="quartz"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        multiSelect />
    </DemoForm>
  <br />
    <DemoForm>
      <ButtonGroup
        variant="danger"
        defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        multiSelect />
    </DemoForm>
  <br />
    <DemoForm>
      <ButtonGroup
        defaultChecked="magnetite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        multiSelect />
    </DemoForm>
  <br />
    <DemoForm>
      <ButtonGroup
        defaultChecked={['fluorite', 'quartz']}
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        multiSelect />
    </DemoForm>
  <br />
    <DemoForm>
      <ButtonGroup
        defaultChecked={['magnetite', 'quartz']}
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        multiSelect />
    </DemoForm>
  <br />
    <DemoForm>
      <ButtonGroup
        defaultChecked={['fluorite', 'magnetite']}
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        multiSelect />
    </DemoForm>
    </div>
  `
};
