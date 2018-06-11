/* @flow */
import Button from '../../../../../library/Button';
import {
  DialogActions,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../../../../library/Dialog';
import DemoLayout from '../components/DemoLayout';
import Dialog from '../components/DemoDialog';

export default {
  id: 'sizes',
  title: 'Sizes',
  description: `TODO`,
  scope: {
    Button,
    DemoLayout,
    Dialog,
    DialogActions,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogTitle
  },
  source: `() => {
    return ['small', 'medium', 'large'].map(size => {
      return (
        <DemoLayout key={size}>
          <Dialog size={size}>
            <DialogHeader>
              <DialogTitle>
                Lorem ipsum dolor sit amet
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </DialogBody>
            <DialogFooter>
              <DialogActions>
                <Button minimal>Cancel</Button>
                <Button primary>Action</Button>
              </DialogActions>
            </DialogFooter>
          </Dialog>
        </DemoLayout>
      );
    });
  }
   `
};
