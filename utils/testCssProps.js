/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import * as emotion from 'emotion';
import { getStyles } from 'jest-emotion';

export default function testCssProps(Component: any) {
  describe('Supports CSS props', () => {
    it('css', () => {
      const props = { css: { color: 'rebeccapurple' } };
      shallow(<Component {...props} />);
      const styles = getStyles(emotion);

      expect(styles).toContain(props.css.color);
    });

    it('className', () => {
      const props = { className: 'test' };
      const component = shallow(<Component {...props} />);

      expect(component.props().className).toContain(props.className);
    });
  });
}
