/* @flow */
import { ButtonGroup } from '../../../../../../library/Button';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'inline',
  title: 'Inline',
  description: `Use the \`inline\` prop to display choices inline horizontally
rather than stacked vertically.`,
  scope: { DemoForm, ButtonGroup },
  source: `
    <DemoForm>
      <ButtonGroup
        inline
        name="mineral"
        defaultChecked="quartz"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]} />
    </DemoForm>
  `
};
