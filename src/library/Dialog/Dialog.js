/* @flow */
import React, { Component } from 'react';
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
  /** TODO */
  appSelector?: string,
  /** TODO - Shorthand alternative to using DialogFooter and DialogActions */
  actions?: Array<React$Node>,
  /** TODO */
  children?: React$Node,
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
      pointerEvents: 'all',
      position: 'relative',
      ...getSizeStyles(size)
    };
  },
  root: ({ modeless, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      alignItems: 'center',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      pointerEvents: modeless ? 'none' : undefined,
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
  },
  {
    displayName: 'CloseButton',
    withProps: {
      iconStart: <IconClose />,
      minimal: true,
      size: 'small'
    }
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

  appNodes: ?Array<HTMLElement>;

  id: string = `dialog-${generateId()}`;

  dialogRoot: ?HTMLElement;

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
      children,
      closeOnClickOutside,
      closeOnEscape,
      disableFocusTrap,
      isOpen,
      hideOverlay,
      modeless,
      size,
      title,
      usePortal,
      ...restProps
    } = this.props;
    const { isExited, isExiting } = this.state;

    if (isExited) {
      return null;
    }

    const headerId = this.getHeaderId();
    const contentId = this.getContentId();
    const hasHeader = title || findByType(children, DialogHeader);

    const rootProps = {
      /* eslint-disable react/prop-types */
      // $FlowFixMe
      'aria-labelledby': this.props['aria-label']
        ? undefined
        : hasHeader ? headerId : contentId,
      'aria-modal': true,
      id: this.id,
      innerRef: this.setRootRef,
      modeless,
      role: 'dialog',
      tabIndex: '-1',
      ...(closeOnClickOutside && !modeless
        ? { onClick: this.handleClick }
        : undefined),
      ...restProps
    };

    const contentProps = {
      id: contentId,
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
      active: !disableFocusTrap && !modeless
    };

    const output = (
      <Animation {...animationProps}>
        <FocusTrap {...focusTrapProps}>
          <Root {...rootProps}>
            {!hideOverlay && !modeless && <Overlay />}
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
                    handler: this.handleDocumentKeydown
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
      onClick: this.close
    };

    const headerProps = {
      // prettier-ignore
      closeButton: showCloseButton ? <CloseButton {...closeButtonProps} /> : undefined,
      id: this.getHeaderId()
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
      if (headerChild) {
        header = headerChild;
      }
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
      if (bodyChildren) {
        body = <DialogBody>{bodyChildren}</DialogBody>;
      }
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
      if (footerChild) {
        footer = footerChild;
      }
    }

    return footer;
  };

  getHeaderId = () => {
    return `${this.id}-header`;
  };

  getContentId = () => {
    return `${this.id}-content`;
  };

  setContentRef = (node: ?HTMLElement) => {
    this.dialogContent = node;
  };

  setRootRef = (node: ?HTMLElement) => {
    this.dialogRoot = node;
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

  setInitialFocus = () => {
    this.dialogRoot && this.dialogRoot.focus();
  };

  open = () => {
    const { modeless } = this.props;

    this.setLastFocusedElement();

    if (!modeless) {
      this.setAppNode();
      this.disableAppNode();
      noScroll.on();
    }

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
    if (event.key === 'Escape' && !event.defaultPrevented) {
      this.close();
    }
  };

  handleEntered = () => {
    this.setInitialFocus();
    this.props.onOpen && this.props.onOpen();
  };

  handleExiting = () => {
    this.setState({
      isExiting: true
    });
  };

  handleExited = () => {
    const { modeless, onClose } = this.props;

    this.setState(
      {
        isExited: true,
        isExiting: false
      },
      () => {
        if (!modeless) {
          noScroll.off();
          this.enableAppNode();
        }

        this.restoreFocus();
        onClose && onClose();
      }
    );
  };

  isEventOutsideNode = (event: SyntheticEvent<Node>, node: ?HTMLElement) => {
    const { target } = event;
    return node && target instanceof Node && !node.contains(target);
  };

  setAppNode = () => {
    const { appSelector } = this.props;

    if (appSelector && canUseDOM) {
      this.appNodes = Array.from(document.querySelectorAll(appSelector));

      if (!this.appNodes.length) {
        throw new Error(
          '[mineral-ui/Dialog]: Unable to find app node(s) using the appSelector prop.'
        );
      }
    }
  };

  disableAppNode = () => {
    this.appNodes &&
      this.appNodes.forEach((node) => node.setAttribute('aria-hidden', 'true'));
  };

  enableAppNode = () => {
    this.appNodes &&
      this.appNodes.forEach((node) => node.removeAttribute('aria-hidden'));
  };
}
