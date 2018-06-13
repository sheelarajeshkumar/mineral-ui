/* @flow */
import { ButtonGroup } from '../../../../../../library/Button';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'multi-select',
  title: 'Multi-Select',
  description: `TODO`,
  scope: { DemoForm, ButtonGroup },
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
