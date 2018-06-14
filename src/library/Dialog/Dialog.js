/* @flow */
import React, { cloneElement, Component } from 'react';
import { canUseDOM } from 'exenv';
import FocusTrap from 'focus-trap-react';
import noScroll from 'no-scroll';
import Transition from 'react-transition-group/Transition';
import { createStyledComponent, pxToEm } from '../styles';
import { createThemedComponent } from '../themes';
import { generateId, excludeByType, findByType } from '../utils';
import Button from '../Button';
import IconClose from '../Icon/IconClose';
import Portal from '../Portal';
import EventListener from '../EventListener';
import DialogActions from './DialogActions';
import DialogBody from './DialogBody';
import DialogFooter from './DialogFooter';
import DialogHeader from './DialogHeader';
import DialogTitle from './DialogTitle';
import { componentTheme as dialogRowComponentTheme } from './DialogRow';

type Props = {
  /** TODO - Shorthand alternative to using DialogFooter and DialogActions */
  actions?: Array<React$Node>,
  /** TODO */
  children: React$Node,
  /** TODO */
  closeButtonLabel?: string,
  /** TODO */
  closeOnEscape?: boolean,
  /** TODO */
  closeOnClickOutside?: boolean,
  /** TODO */
  disableFocusTrap?: boolean,
  /** TODO */
  hideOverlay?: boolean,
  /** Id of the Dialog */
  id?: string,
  /**
   * Determines whether the Dialog is open.
   */
  isOpen?: boolean,
  /** TODO */
  modeless?: boolean,
  /** Called when Dialog is closed */
  onClose?: () => void,
  /** Called when Dialog is opened */
  onOpen?: () => void,
  /** TODO */
  showCloseButton?: boolean,
  /** TODO */
  size?: 'small' | 'medium' | 'large',
  /** TODO - Shorthand alternative to using DialogHeader and DialogTitle */
  title?: string,
  /** @Private TODO */
  usePortal?: boolean,
  /** Available variants */
  variant?: 'danger' | 'success' | 'warning'
};

type State = {
  isExited: boolean,
  isExiting: boolean
};

export const componentTheme = (baseTheme: Object) => ({
  Dialog_zIndex: baseTheme.zIndex_100,

  DialogCloseButton_margin: baseTheme.space_inline_sm,

  DialogContent_backgroundColor: baseTheme.panel_backgroundColor,
  DialogContent_borderColor: baseTheme.panel_borderColor,
  DialogContent_borderRadius: baseTheme.borderRadius_1,
  DialogContent_boxShadow: baseTheme.boxShadow_5,
  DialogContent_maxHeight: '80vh',
  DialogContent_maxHeight_small: pxToEm(560),
  DialogContent_maxHeight_medium: pxToEm(560),
  DialogContent_maxHeight_large: pxToEm(720),
  DialogContent_maxWidth_small: pxToEm(400),
  DialogContent_maxWidth_medium: pxToEm(640),
  DialogContent_maxWidth_large: pxToEm(1200),
  DialogContent_minWidth: pxToEm(360),
  DialogContent_offsetVertical: baseTheme.space_stack_xxl,
  DialogContent_width_small: '35vw',
  DialogContent_width_medium: '50vw',
  DialogContent_width_large: '80vw',
  DialogContent_zIndex: baseTheme.zIndex_200,

  DialogOverlay_backgroundColor: 'rgba(0, 0, 0, 0.6)',

  ...dialogRowComponentTheme(baseTheme),
  ...baseTheme
});

const ANIMATION_DURATION_MS = 250; // TODO: Make prop or theme variable?

const styles = {
  overlay: ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      backgroundColor: theme.DialogOverlay_backgroundColor,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: -1
    };
  },
  content: ({ size, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    const getSizeStyles = (size: string) => {
      const maxWidth = theme[`DialogContent_maxWidth_${size}`];
      const maxHeight = theme[`DialogContent_maxHeight_${size}`];
      const width = theme[`DialogContent_width_${size}`];
      const offsetVertical = theme.DialogContent_offsetVertical;

      const maxHeightNumber = parseFloat(maxHeight);
      const offsetVerticalNumber = parseFloat(offsetVertical);
      const minHeight = `${maxHeightNumber + 2 * offsetVerticalNumber}em`;

      return {
        maxWidth,
        width,
        [`@media(min-height: ${minHeight})`]: {
          maxHeight
        }
      };
    };

    return {
      backgroundColor: theme.DialogContent_backgroundColor,
      border: `1px solid ${theme.DialogContent_borderColor}`,
      borderRadius: theme.DialogContent_borderRadius,
      boxShadow: theme.DialogContent_boxShadow,
      display: 'flex',
      flexDirection: 'column',
      maxHeight: theme.DialogContent_maxHeight,
      minWidth: theme.DialogContent_minWidth,
      position: 'relative',
      ...getSizeStyles(size)
    };
  },
  root: ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: theme.Dialog_zIndex
    };
  },
  animate: ({ state }) => ({
    opacity: state === 'entered' ? 1 : 0,
    transition: `opacity ${ANIMATION_DURATION_MS}ms ease`,
    willChange: 'opacity'
  })
};

const Root = createStyledComponent('div', styles.root, {
  displayName: 'Dialog',
  filterProps: ['title'],
  includeStyleReset: true
});

const Overlay = createStyledComponent('div', styles.overlay, {
  displayName: 'Overlay'
});

const DialogContent = createStyledComponent('div', styles.content, {
  displayName: 'DialogContent'
});

const Animate = createStyledComponent('div', styles.animate, {
  displayName: 'Animate'
});

const Animation = ({ children, ...restProps }: Object) => {
  return (
    <Transition
      appear
      mountOnEnter
      timeout={ANIMATION_DURATION_MS}
      unmountOnExit
      {...restProps}>
      {(state) => <Animate state={state}>{children}</Animate>}
    </Transition>
  );
};

const ThemedButton = createThemedComponent(Button, ({ theme }) => ({
  ButtonIcon_color: theme.color
}));

const CloseButton = createStyledComponent(
  ThemedButton,
  ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';

    return {
      marginLeft: rtl ? null : theme.DialogCloseButton_margin,
      marginRight: rtl ? theme.DialogCloseButton_margin : null
    };
  }
);

/**
 * Dialog - TODO
 */
export default class Dialog extends Component<Props, State> {
  static defaultProps: Object = {
    closeButtonLabel: 'close',
    closeOnClickOutside: true,
    closeOnEscape: true,
    hideOverlay: false,
    size: 'medium',
    usePortal: true
  };

  state: State = {
    isExited: false,
    isExiting: false
  };

  id: string = `dialog-${generateId()}`;

  dialogContent: ?HTMLElement;

  lastFocusedElement: ?HTMLElement;

  componentWillReceiveProps(nextProps: Props) {
    const isOpening = !this.props.isOpen && nextProps.isOpen;

    if (isOpening) {
      this.open();
    }
  }

  render() {
    const {
      closeOnClickOutside,
      closeOnEscape,
      disableFocusTrap,
      isOpen,
      hideOverlay,
      size,
      usePortal,
      ...restProps
    } = this.props;
    const { isExited, isExiting } = this.state;

    if (isExited) {
      return null;
    }

    const headerId = this.getHeaderId();

    const rootProps = {
      'aria-labelledby': headerId,
      'aria-modal': true,
      id: this.id,
      role: 'dialog',
      ...(closeOnClickOutside ? { onClick: this.handleClick } : undefined),
      ...restProps
    };

    const contentProps = {
      innerRef: this.setContentRef,
      role: 'document',
      size
    };

    const animationProps = {
      in: isOpen && !isExiting,
      onExiting: this.handleExiting,
      onExited: this.handleExited,
      onEntered: this.handleEntered
    };

    const focusTrapProps = {
      active: !disableFocusTrap,
      focusTrapOptions: {
        initialFocus: `#${headerId}`
      }
    };

    const output = (
      <Animation {...animationProps}>
        <FocusTrap {...focusTrapProps}>
          <Root {...rootProps}>
            {!hideOverlay && <Overlay />}
            <DialogContent {...contentProps}>
              {this.renderHeader()}
              {this.renderBody()}
              {this.renderFooter()}
            </DialogContent>
            {closeOnEscape && (
              <EventListener
                listeners={[
                  {
                    target: 'document',
                    event: 'keydown',
                    handler: this.handleDocumentKeydown,
                    options: true
                  }
                ]}
              />
            )}
          </Root>
        </FocusTrap>
      </Animation>
    );

    return usePortal ? <Portal>{output}</Portal> : output;
  }

  renderHeader = () => {
    const {
      children,
      closeButtonLabel,
      showCloseButton,
      title,
      variant
    } = this.props;

    const closeButtonProps = {
      'aria-label': closeButtonLabel,
      iconStart: <IconClose />,
      minimal: true,
      onClick: this.close,
      size: 'small'
    };

    const headerProps = {
      // prettier-ignore
      closeButton: showCloseButton ? <CloseButton {...closeButtonProps} /> : undefined,
      id: this.getHeaderId(),
      tabIndex: '-1'
    };
    let header;
    if (title) {
      const titleProps = {
        variant
      };

      header = (
        <DialogHeader {...headerProps}>
          <DialogTitle {...titleProps}>{title}</DialogTitle>
        </DialogHeader>
      );
    } else {
      const headerChild = findByType(children, DialogHeader);
      if (!headerChild) {
        throw new Error(
          '[mineral-ui/Dialog]: Dialog must contain a DialogHeader or use the title prop.'
        );
      }
      header = cloneElement(headerChild, headerProps);
    }

    return header;
  };

  renderBody = () => {
    const { children } = this.props;

    let body;
    const bodyChild = findByType(children, DialogBody);
    if (bodyChild) {
      body = bodyChild;
    } else {
      const bodyChildren = excludeByType(children, [
        DialogHeader,
        DialogFooter
      ]);
      body = <DialogBody>{bodyChildren}</DialogBody>;
    }

    return body;
  };

  renderFooter = () => {
    const { actions, children } = this.props;

    let footer;
    if (actions) {
      footer = (
        <DialogFooter>
          <DialogActions>{actions}</DialogActions>
        </DialogFooter>
      );
    } else {
      const footerChild = findByType(children, DialogFooter);
      if (!footerChild) {
        throw new Error(
          '[mineral-ui/Dialog]: Dialog must contain a DialogFooter or use the actions prop.'
        );
      }
      footer = footerChild;
    }

    return footer;
  };

  getHeaderId = () => {
    return `${this.id}-header`;
  };

  setContentRef = (node: ?HTMLElement) => {
    this.dialogContent = node;
  };

  setLastFocusedElement = () => {
    if (canUseDOM) {
      const { activeElement, body } = global.document;
      this.lastFocusedElement =
        activeElement && activeElement.focus ? activeElement : body;
    }
  };

  restoreFocus = () => {
    this.lastFocusedElement && this.lastFocusedElement.focus();
  };

  open = () => {
    this.setLastFocusedElement();
    noScroll.on();

    this.setState({
      isExited: false
    });
  };

  close = () => {
    this.handleExiting();
  };

  handleClick = (event: SyntheticEvent<Node>) => {
    if (this.isEventOutsideNode(event, this.dialogContent)) {
      this.close();
    }
  };

  handleDocumentKeydown = (event: SyntheticKeyboardEvent<>) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  handleEntered = () => {
    this.props.onOpen && this.props.onOpen();
  };

  handleExiting = () => {
    this.setState({
      isExiting: true
    });
  };

  handleExited = () => {
    this.setState(
      {
        isExited: true,
        isExiting: false
      },
      () => {
        noScroll.off();
        this.restoreFocus();
        this.props.onClose && this.props.onClose();
      }
    );
  };

  isEventOutsideNode = (event: SyntheticEvent<Node>, node: ?HTMLElement) => {
    const { target } = event;
    return node && target instanceof Node && !node.contains(target);
  };
}
