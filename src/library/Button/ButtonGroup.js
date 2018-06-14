/* @flow */
import React, { Component } from 'react';
import { ChoiceGroup } from '../Choice';
// import _Radio from '../Radio';
import { createStyledComponent } from '../styles';
import InputButton from './InputButton';

type Props = {
  /**
   * Value of the selected [Button](/components/button); primarily for use with controlled
   * components. If this prop is specified, an `onChange` handler must also be
   * specified. See also: `defaultChecked`.
   */
  checked?: string | Array<string>,
  /** Mineral [Button](/components/button) components */
  children?: React$Node,
  /** Data used to contruct [Button](/components/button), see [example](#data) */
  data?: Array<{ label: string | React$Element<*>, value: string }>,
  /**
   * Value of the selected [Button](/components/button); primarily for use with
   * uncontrolled components.
   */
  defaultChecked?: string | Array<string>,
  /** Display the choices inline horizontally rather than stacked vertically. */
  inline?: boolean,
  /** The name of the group */
  name: string,
  /** TODO Determines whether HTML inputs are type radio or checkbox */
  multiSelect?: boolean,
  /** Function called when a choice is selected */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Props to be applied directly to the root element */
  rootProps?: Object,
  /** Available RadioButton sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo'
};

type State = {
  checked?: string | Array<string> // Appease Dropdown
};

export const componentTheme = (baseTheme: Object) => ({
  // ButtonGroup_backgroundColor: baseTheme.color_gray_20,
});

// const styles = ({
//   '& > *': {marginRight: '0px'}
// })

// const Root = createStyledComponent(
//   ChoiceGroup,
//   {},
//   {
//     displayName: 'ButtonGroup'
//   }
// );

/**
 * ButtonGroup allows authors to construct a group of [Buttons](/components/button)
 * and provides a simpler API than working with Button directly.
 *
 * ButtonGroup allows users to select a single option from a list.
 */
class ButtonGroup extends Component<Props, State> {
  state: State = {
    checked: this.props.defaultChecked // TODO consider factoring in children prop for defaultChecked = true
  };

  render() {
    const {
      defaultChecked: ignoreDefaultChecked,
      multiSelect,
      rootProps: otherRootProps,
      ...restProps
    } = this.props;
    const type = multiSelect ? 'checkbox' : 'radio';

    const rootProps = {
      checked: this.getControllableValue('checked'), //this.state.checked,
      input: InputButton,
      onChange: (event) => {
        this.handleChange(event, type);
      },
      rootProps: {
        inline: true,
        role: `${type === 'radio' ? 'radio' : ''}group`,
        ...otherRootProps
      },
      type,
      ...restProps // Note: Props are spread to input rather than Root
    };

    return <ChoiceGroup {...rootProps} />;
  }

  handleChange = (event, type) => {
    event.persist();
    if (this.isControlled('checked')) {
      this.changeActions(event);
    } else {
      this.setState(
        (prevState) => {
          return this.updateState(event, prevState, type);
        },
        () => {
          this.changeActions(event);
        }
      );
    }
  };

  changeActions = (event) => {
    this.props.onChange && this.props.onChange(event);
  };

  updateState = (event, prevState, type) => {
    const { target } = event;
    let checked;

    if (type === 'radio') {
      checked = target.value;
    } else if (type === 'checkbox') {
      checked = [].concat(prevState.checked);
      const index = checked.indexOf(target.value);
      const hasValue = index !== -1;

      if (target.checked && !hasValue) {
        checked.push(target.value);
      } else if (hasValue) {
        checked.splice(index, 1);
      }
    }
    return { checked };
  };

  isControlled = (prop: string) => {
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
