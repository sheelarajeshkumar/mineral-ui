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
  id: 'basic',
  title: 'Basic Usage',
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
  source: `
    <DemoLayout>
      <Dialog>
        <DialogHeader>
          <DialogTitle>
            LLorem ipsum dolor sit amet
oLorem ipsum dolor sit amet
rLorem ipsum dolor sit amet
eLorem ipsum dolor sit amet
mLorem ipsum dolor sit amet
 Lorem ipsum dolor sit amet
iLorem ipsum dolor sit amet
pLorem ipsum dolor sit amet
sLorem ipsum dolor sit amet
um dolor sit amet
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
    </DemoLayout>`
};
