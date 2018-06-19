/* @flow */
import ButtonGroup from '../../../../../library/ButtonGroup';
import DemoForm from '../components/DemoForm';

export default {
  id: 'multi-select',
  title: 'Multi-Select',
  description: `Use the \`multiSelect\` prop to enable selection of multiple
Buttons. This renders each Button as a span with input type \`checkbox\``, //TODO: Reword
  scope: { ButtonGroup, DemoForm },
  source: `
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
  `
};
