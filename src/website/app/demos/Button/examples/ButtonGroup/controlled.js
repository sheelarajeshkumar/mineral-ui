/* @flow */
import { Component } from 'react';
import Button, { ButtonGroup } from '../../../../../../library/Button';
import DemoLayout from '../../components/DemoLayout';

export default {
  id: 'controlled',
  title: 'Controlled',
  description: `Provide the \`checked\` prop and an \`onChange\` handler to
create a controlled component.`,
  scope: { Button, ButtonGroup, Component, DemoLayout },
  source: `
  () => {
    class MyForm extends Component {
      constructor(props) {
        super(props);

        this.state = {
          checked: 'quartz'
        };

        this.handleChange = this.handleChange.bind(this);
        this.resetDefaultSelected = this.resetDefaultSelected.bind(this);
      }

      handleChange(event) {
        this.setState({
          checked: event.target.value
        });
      }

      resetDefaultSelected() {
        this.setState({
          checked: 'quartz'
        });
      }

      render() {
        return (
          <DemoLayout>
            <ButtonGroup
              checked={this.state.checked}
              data={[
                { label: 'Fluorite', value: 'fluorite' },
                { label: 'Magnetite', value: 'magnetite' },
                { label: 'Quartz', value: 'quartz' }
              ]}
              name="mineral"
              multiSelect
              onChange={this.handleChange} />
            <Button minimal size="small" onClick={this.resetDefaultSelected}>Reset Default Selected</Button>
          </DemoLayout>
        );
      }
    }

    return <MyForm />;
  }
  `
};
