/* @flow */
import ButtonGroup from '../../../../../library/ButtonGroup';
import DemoForm from '../components/DemoForm';

export default {
  id: 'uncontrolled',
  title: 'Uncontrolled',
  description: `Create an uncontrolled ButtonGroup by using the
\`defaultChecked\` prop rather than the \`checked\` prop.`,
  scope: { ButtonGroup, DemoForm },
  source: `
    <DemoForm>
      <ButtonGroup
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        defaultChecked="quartz"
        name="mineral" />
    </DemoForm>
  `
};
