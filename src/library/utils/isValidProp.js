/* @flow */

import _htmlAttributes from 'react-html-attributes';
import memoize from 'fast-memoize';
import reactProps from './reactProps';
import { settify } from './asSet';

const REGEX_DATA_OR_ARIA = /^(data|aria)-/;
const htmlAttributes = settify(_htmlAttributes);
const svgTags = htmlAttributes.elements.svg;
const svgAttributes = htmlAttributes.svg;

const isElement = (tag) => typeof tag === 'string';
const isComponent = (tag) => !isElement(tag);
const isReactProp = (prop) => reactProps.includes(prop);
const isDataOrAria = (prop) => REGEX_DATA_OR_ARIA.test(prop);
const isSvgProp = (tag, prop) => {
  return svgTags.has(tag) && svgAttributes.has(prop);
};
const isHtmlProp = (tag, prop) => {
  return (
    htmlAttributes['*'].has(prop) ||
    (htmlAttributes[tag] && htmlAttributes[tag].has(prop))
  );
};

const isValidProp = (tag: any, prop: string) =>
  isComponent(tag) ||
  isReactProp(prop) ||
  isHtmlProp(tag, prop) ||
  isSvgProp(tag, prop) ||
  isDataOrAria(prop);

export default memoize(isValidProp);
