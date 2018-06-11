/* @flow */
import { ButtonGroup } from '../../../../../../library/Button';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'uncontrolled',
  title: 'Uncontrolled',
  description: `Create an uncontrolled ButtonGroup by using the
\`defaultChecked\` prop rather than the \`checked\` prop.`,
  scope: { DemoForm, ButtonGroup },
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
