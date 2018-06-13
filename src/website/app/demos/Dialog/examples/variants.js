/* @flow */
import Button from '../../../../../library/Button';
import { capitalize } from '../../../../../library/utils';
import DemoLayout from '../components/DemoLayout';
import Dialog from '../components/DemoDialog';

export default {
  id: 'variants',
  title: 'Variants',
  description: `TODO`,
  scope: {
    Button,
    capitalize,
    DemoLayout,
    Dialog
  },
  source: `() => {
    return ['success', 'warning', 'danger'].map(variant => {
      return (
        <DemoLayout key={variant}>
          <Dialog
            variant={variant}
            title={capitalize(variant) + ' ipsum dolor sit amet'}
            actions={[
              <Button minimal key="0">Cancel</Button>,
              <Button primary variant={variant} key="1">Action</Button>
            ]}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </Dialog>
        </DemoLayout>
      );
    });
  }
   `
};
