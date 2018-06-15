/* @flow */
import { Component } from 'react';
import Button from '../../../../../../library/Button';
import Dialog from '../../../../../../library/Dialog';

export default {
  id: 'modeless',
  title: 'Modeless',
  description: `TODO`,
  scope: {
    Button,
    Component,
    Dialog
  },
  source: `() => {
    class Demo extends Component {
      constructor(props) {
        super(props);

        this.state = {
          isOpen: false
        };

        this.toggleDialog = this.toggleDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }

      toggleDialog() {
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
        }));
      }

      handleClose() {
        this.setState(prevState => ({
          isOpen: false
        }));
      }

      render() {
        const { isOpen } = this.state;

        return (
          <div>
            <Button onClick={this.toggleDialog}>{isOpen ? 'Close' : 'Open' } Dialog</Button>
            <Dialog
              modeless
              title="Lorem ipsum dolor sit amet"
              actions={[
                <Button minimal key="0" onClick={this.toggleDialog}>Cancel</Button>,
                <Button primary key="1" onClick={this.toggleDialog}>Action</Button>
              ]}
              isOpen={isOpen}
              onClose={this.handleClose}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </Dialog>
          </div>
        )
      }
    }

    return <Demo />;
  }`
};
