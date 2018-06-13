/* @flow */
import { ButtonGroup } from '../../../../../../library/Button';
import { FormFieldDivider } from '../../../../../../library/Form';
import DemoForm from '../../components/DemoForm';

export default {
  id: 'sizes',
  title: 'Sizes',
  description: `TODO`,
  scope: { DemoForm, FormFieldDivider, ButtonGroup },
  source: `
    <div>
      <DemoForm>
        <ButtonGroup
          defaultChecked="fluorite"
          data={[
            { label: 'Fluorite', value: 'fluorite' },
            { label: 'Magnetite', value: 'magnetite' },
            { label: 'Quartz', value: 'quartz' }
          ]}
          name="mineral-1"
          size="small" />
      </DemoForm>

      <FormFieldDivider />

      <DemoForm>
        <ButtonGroup
          defaultChecked="fluorite"
          data={[
            { label: 'Fluorite', value: 'fluorite' },
            { label: 'Magnetite', value: 'magnetite' },
            { label: 'Quartz', value: 'quartz' }
          ]}
          name="mineral-1"
          size="medium" />
      </DemoForm>

      <FormFieldDivider />

      <DemoForm>
        <ButtonGroup
          defaultChecked="fluorite"
          data={[
            { label: 'Fluorite', value: 'fluorite' },
            { label: 'Magnetite', value: 'magnetite' },
            { label: 'Quartz', value: 'quartz' }
          ]}
          name="mineral-1" />
      </DemoForm>

      <FormFieldDivider />

      <DemoForm>
        <ButtonGroup
          defaultChecked="fluorite"
          data={[
            { label: 'Fluorite', value: 'fluorite' },
            { label: 'Magnetite', value: 'magnetite' },
            { label: 'Quartz', value: 'quartz' }
          ]}
          name="mineral-1"
          size="jumbo" />
      </DemoForm>
    </div>
  `
};
