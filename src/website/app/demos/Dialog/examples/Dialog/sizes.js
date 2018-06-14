/* @flow */
import Button from '../../../../../../library/Button';
import DemoLayout from '../../components/DemoLayout';
import Dialog from '../../components/DemoDialog';

export default {
  id: 'sizes',
  title: 'Sizes',
  description: `TODO`,
  scope: {
    Button,
    DemoLayout,
    Dialog
  },
  source: `() => {
    return ['small', 'medium', 'large'].map(size => {
      return (
        <DemoLayout key={size}>
          <Dialog
            size={size}
            title="Lorem ipsum dolor sit amet"
            actions={[
              <Button minimal key="0">Cancel</Button>,
              <Button primary key="1">Action</Button>
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
