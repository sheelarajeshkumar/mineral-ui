/* @flow */
import React from 'react';
import { mount } from 'enzyme';
import { createStyledComponent } from '../../styles';

const ButtonOne = createStyledComponent(
  'button',
  {},
  {
    displayName: 'ButtonOne',
    filterProps: ['filterMe'],
    forwardProps: ['forwardMe']
  }
);

const ButtonTwo = createStyledComponent(
  ButtonOne,
  {},
  {
    displayName: 'ButtonTwo'
  }
);

const Image = createStyledComponent('img', {});
const ImageWithRootEl = createStyledComponent(
  Image,
  {},
  {
    displayName: 'ComponentWithRootEl',
    rootEl: 'div'
  }
);

describe('createStyledComponent', () => {
  describe('when styling an element', () => {
    const wrapper = mount(<ButtonOne forwardMe filterMe title="button one" />);
    const button = wrapper.find('button');

    it('forwards valid DOM attributes', () => {
      expect(button.props().title).toBeDefined();
    });

    it('forwards specified forwardProps', () => {
      expect(button.props().forwardMe).toBeDefined();
    });

    it('filters invalid DOM attributes', () => {
      expect(button.props().xyz).toBeUndefined();
    });

    it('filters filterProps', () => {
      expect(button.props().filterMe).toBeUndefined();
    });
  });

  describe('when styling a styled component', () => {
    const wrapper = mount(
      <ButtonTwo forwardMe filterMe title="button two" xyz />
    );
    const button = wrapper.find('button');

    it('forwards valid DOM attributes', () => {
      expect(button.props().title).toBeDefined();
    });

    it('forwards specified forwardProps', () => {
      expect(button.props().forwardMe).toBeDefined();
    });

    it('filters invalid DOM attributes', () => {
      expect(button.props().xyz).toBeUndefined();
    });

    it('filters filterProps', () => {
      expect(button.props().filterMe).toBeUndefined();
    });

    describe('with rootEl option', () => {
      const wrapper = mount(<ImageWithRootEl src="http" />);
      const image = wrapper.find('img');

      it('filters invalid DOM attributes', () => {
        // src is invalid here because rootEl is div
        expect(image.props().src).toBeUndefined();
      });
    });
  });
});
