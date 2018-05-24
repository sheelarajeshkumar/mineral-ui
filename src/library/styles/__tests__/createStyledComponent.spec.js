/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import { createStyledComponent } from '../../styles';

const mountButton = (props = {}, options = {}) => {
  const Button = createStyledComponent('button', {}, options);
  return mount(<Button {...props} />);
};

describe('createStyledComponent', () => {
  const wrapper = mountButton({ type: 'button', xyz: true });
  const button = wrapper.childAt(0);

  it('forwards valid DOM attributes', () => {
    expect(button.props().type).toBeDefined();
  });

  it('filters invalid DOM attributes', () => {
    expect(button.props().xyz).toBeUndefined();
  });

  describe('with withProps option', () => {
    const wrapper = mountButton(
      {},
      {
        withProps: {
          type: 'button'
        }
      }
    );
    const button = wrapper.childAt(0);

    it('passes props to component', () => {
      expect(button.props().type).toBe('button');
    });
  });

  describe('with filterProps option', () => {
    const wrapper = mountButton(
      { filterMe: true },
      {
        filterProps: ['filterMe']
      }
    );
    const button = wrapper.childAt(0);

    it('filters filterProps', () => {
      expect(button.props().filterMe).toBeUndefined();
    });
  });

  describe('with forwardProps option', () => {
    const wrapper = mountButton(
      { forwardMe: true },
      {
        forwardProps: ['forwardMe']
      }
    );
    const button = wrapper.childAt(0);

    it('forwards forwardMe', () => {
      expect(button.props().forwardMe).toBeDefined();
    });
  });

  describe('with rootEl option', () => {
    const Image = createStyledComponent('img', {});
    const StyledImage = createStyledComponent(
      Image,
      {},
      {
        rootEl: 'div'
      }
    );

    const wrapper = mount(<StyledImage src="http" />);
    const image = wrapper.childAt(0);

    it('filters invalid DOM attributes', () => {
      // src is invalid here because rootEl is div
      expect(image.props().src).toBeUndefined();
    });
  });
});
