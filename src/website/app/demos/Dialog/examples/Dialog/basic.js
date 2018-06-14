/* @flow */
import Button from '../../../../../../library/Button';
import DemoLayout from '../../components/DemoLayout';
import Dialog from '../../components/DemoDialog';

export default {
  id: 'basic',
  title: 'Basic Usage',
  description: `TODO`,
  scope: {
    Button,
    DemoLayout,
    Dialog
  },
  source: `
    <DemoLayout>
      <Dialog
        title="Lorem ipsum dolor sit amet"
        actions={[
          <Button minimal key="0">Cancel</Button>,
          <Button primary key="1">Action</Button>
        ]}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </Dialog>
    </DemoLayout>`
};
