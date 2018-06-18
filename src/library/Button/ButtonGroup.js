/* @flow */
import React, { Component } from 'react';
import { ChoiceGroup } from '../Choice';
import { createStyledComponent } from '../styles';
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
  multiSelect?: boolean,
  /** Function called when a choice is selected */
  onChange?: (event: SyntheticInputEvent<>) => void,
  /** Indicates that the field is required. Not forwarded for checkboxes. */
  required?: boolean,
  /** Props to be applied directly to the root element */
  rootProps?: Object,
  /** Available RadioButton sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Available variants */
  variant?: 'regular' | 'danger' | 'success' | 'warning'
};

type State = {
  checked?: string | Array<string> | void
};

/**
 * TODO ButtonGroup allows authors to construct a group of [Buttons](/components/button)
 * that perform like a [RadioGroup](/components/radio-group) or
 * [CheckboxGroup](/components/checkbox-group).
 */
class ButtonGroup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { children, data, defaultChecked, multiSelect } = this.props;
    let childDefaults: string | Array<string> | void = [];

    // TODO clean up this conditional?
    if (children && multiSelect) {
      children.map((checkbox) => {
        if (checkbox.props.defaultChecked && Array.isArray(childDefaults)) {
          childDefaults.push(checkbox.props.value);
        }
      });
    } else if (children && !multiSelect) {
      const defaultRadio = children.find((radio) => {
        return radio.props.defaultChecked;
      });
      childDefaults = defaultRadio && defaultRadio.props.value;
    } else if (data && multiSelect) {
      data.map((checkbox) => {
        if (checkbox.defaultChecked && Array.isArray(childDefaults)) {
          childDefaults.push(checkbox.value);
        }
      });
    } else if (data && !multiSelect) {
      const defaultRadio = data.find((radio) => {
        return radio.defaultChecked;
      });
      childDefaults = defaultRadio && defaultRadio.value;
    }
    this.state = {
      checked: defaultChecked || childDefaults || ''
    };
  }
  // state: State = {
  //   checked:
  //     this.props.defaultChecked ||
  //     this.props.children.map((child) => {
  //       if (child.props.defaultChecked) {
  //         return child.props.value;
  //       }
  //     }) ||
  //     '' // TODO consider factoring in children prop for defaultChecked = true
  // };

  render() {
    const {
      defaultChecked: ignoreDefaultChecked,
      multiSelect,
      rootProps: otherRootProps,
      ...restProps
    } = this.props;
    const type = multiSelect ? 'checkbox' : 'radio';

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
      // TODO: double-check that this is the correct check for prevState
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
