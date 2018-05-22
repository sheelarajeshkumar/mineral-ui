/* @flow */

import htmlAttributes from 'react-html-attributes';
import memoize from 'fast-memoize';
import reactProps from './reactProps';

const REGEX_DATA_OR_ARIA = /^(data|aria)-/;
const globalHtmlProps = htmlAttributes['*'];
const svgTags = htmlAttributes.elements.svg;
const svgAttributes = htmlAttributes.svg;

const isElement = (tag) => typeof tag === 'string';
const isComponent = (tag) => !isElement(tag);
const isReactProp = (prop) => reactProps.includes(prop);
const isDataOrAria = (prop) => REGEX_DATA_OR_ARIA.test(prop);
const isSvgProp = (tag, prop) => {
  return svgTags.includes(tag) && svgAttributes.includes(prop);
};
const isHtmlProp = (tag, prop) => {
  const tagHtmlProps = globalHtmlProps[tag] || [];
  return globalHtmlProps.includes(prop) || tagHtmlProps.includes(prop);
};

const isValidProp = (tag: any, prop: string) =>
  isComponent(tag) ||
  isReactProp(prop) ||
  isHtmlProp(tag, prop) ||
  isSvgProp(tag, prop) ||
  isDataOrAria(prop);

export default memoize(isValidProp);
