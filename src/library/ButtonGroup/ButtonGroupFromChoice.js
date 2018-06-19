/* @flow */
import React, { Component } from 'react';
import { ChoiceGroup } from '../Choice';
import { createStyledComponent } from '../styles';
import { setFromArray } from '../utils/collections';
import InputButton from './InputButton';

type Props = {
  /**
   * Value of the selected Radio or an array of values of the selected
   * Checkboxes. Primarily for use with controlled components. If this prop is
   * specified, an `onChange` handler must also be specified. See also:
   * `defaultChecked`.
   */
  checked?: string | Array<string>,
  /** Mineral InputButtons rendered as [Button](/components/button) components */
  children?: Array<React$Element<*>>,
  /** Data used to contruct InputButtons, see [example](#data) */
  data?: Array<{
    defaultChecked?: boolean,
    label: string | React$Element<*>,
    value: string
  }>,
  /**
   * Value of the selected InputButton [Button](/components/button); primarily for use with
   * uncontrolled components.
   */
  defaultChecked?: string | Array<string>,
  /** Disables all children */
  disabled?: boolean,
  /** @Private Display the choices inline horizontally rather than stacked vertically. */
  inline?: boolean,
  /** Indicates that the field is invalid. Not forwarded for checkboxes. */
  invalid?: boolean,
  /** The name of the group */
  name: string,
  /** Indicates whether HTML inputs are type checkbox (default is type radio) */
  multiple?: boolean,
  /** Function called when a choice is selected */
  onChange?: (event: SyntheticInputEvent<>) => void,
  /** Indicates that the field is required. Not forwarded for checkboxes. */
  required?: boolean,
  /** Props to be applied directly to the root element */
  rootProps?: Object,
  /** Available RadioButton sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Available variants */
  variant?: 'danger' | 'success' | 'warning'
};

type State = {
  checked?: string | Array<string> | void
};

const findDefaultValues = (props) => {
  const { children, data, multiple } = props;
  let defaultValues: string | Array<string> | void = [];

  const addDefaultValue = (value) => {
    defaultValues.push(value);
  };

  if (multiple) {
    if (children && Array.isArray(children)) {
      children.map((button) => {
        if (button.props.defaultChecked && Array.isArray(defaultValues)) {
          addDefaultValue(button.props.value);
        }
      });
    } else if (data) {
      data.map((button) => {
        if (button.defaultChecked && Array.isArray(defaultValues)) {
          addDefaultValue(button.value);
        }
      });
    }
  } else {
    if (children && Array.isArray(children)) {
      const button = children.find((button) => {
        return button.props.defaultChecked;
      });
      defaultValues = button && button.props.value;
    } else if (data) {
      const button = data.find((button) => {
        return button.defaultChecked;
      });
      defaultValues = button && button.value;
    }
  }

  // this works too, but is a little crazy
  // if ((children || data) && multiple) {
  //   (children || data).map((button) => {
  //     if (
  //       (button.defaultChecked ||
  //         (button.props && button.props.defaultChecked)) &&
  //       Array.isArray(defaultValues)
  //     ) {
  //       defaultValues.push(button.value || button.props.value);
  //     }
  //   });
  // } else if ((children || data) && !multiple) {
  //   const button = (children || data).find((button) => {
  //     return (
  //       button.defaultChecked || (button.props && button.props.defaultChecked)
  //     );
  //   });
  //   defaultValues = button && (button.value || button.props.value);
  // }

  return defaultValues;
};

/**
 * TODO ButtonGroup allows authors to construct a group of [Buttons](/components/button)
 * that perform like a [RadioGroup](/components/radio-group) or
 * [CheckboxGroup](/components/checkbox-group).
 */
class ButtonGroup extends Component<Props, State> {
  state: State = {
    checked: this.props.defaultChecked || findDefaultValues(this.props) || ''
  };

  render() {
    const {
      defaultChecked: ignoreDefaultChecked,
      multiple,
      rootProps: otherRootProps,
      ...restProps
    } = this.props;
    const type = multiple ? 'checkbox' : 'radio';

    const rootProps = {
      checked: this.getControllableValue('checked'),
      input: InputButton,
      onChange: (event: SyntheticInputEvent<>) => {
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

  handleChange = (event: SyntheticInputEvent<>, type: string) => {
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

  changeActions = (event: SyntheticInputEvent<>) => {
    this.props.onChange && this.props.onChange(event);
  };

  updateState = (
    event: SyntheticInputEvent<>,
    prevState: State,
    type: string
  ) => {
    const { target } = event;
    let checked;

    if (type === 'radio') {
      checked = target.value;
    } else if (type === 'checkbox' && prevState.checked) {
      // what if prevState.checked is undefined?

      const prevChecked = setFromArray([].concat(prevState.checked));
      prevChecked.has(target.value)
        ? prevChecked.delete(target.value)
        : prevChecked.add(target.value);

      checked = Array.from(prevChecked);
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
