/* @flow */
import Button from '../../../../../library/Button';
import ButtonGroup from '../../../../../library/ButtonGroup';
import { FormField } from '../../../../../library/Form';
import DemoForm from '../components/DemoForm';

export default {
  id: 'form-field',
  title: 'FormField',
  description: `Use a [FormField](/components/form-field) to provide an accessible label
and other features as well as a more streamlined API.`,
  scope: { Button, ButtonGroup, DemoForm, FormField },
  source: `
    <DemoForm>
      <FormField
        caption="We promise not to spam you."
        data={[
          { label: 'Email', value: 'email' },
          { label: 'Telephone', value: 'telephone' },
          { label: 'Text message', value: 'text' },
          { label: 'None', value: 'none' }
        ]}
        defaultChecked="none"
        input={ButtonGroup}
        label="What is your preferred contact method?"
        name="contact"
        required />
    </DemoForm>
  `
};
