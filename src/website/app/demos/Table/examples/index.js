/* @flow */
import basic from './basic';
import columnAlign from './columnAlign';
import columnAlignWithSort from './columnAlignWithSort';
import columnDef from './columnDef';
import customCell from './customCell';
import customColumnHeader from './customColumnHeader';
import customRow from './customRow';
import controlled from './controlled';
import defaultSort from './defaultSort';
import density from './density';
import highContrast from './highContrast';
import importSyntax from './importSyntax';
import kitchenSink from './kitchenSink';
import largeDataSets from './largeDataSets';
import primaryColumn from './primaryColumn';
import rowSelection from './rowSelection';
import rowSelectionAndColumnDef from './rowSelectionAndColumnDef';
import rtl from './rtl';
import scrollable from './scrollable';
import sortByColumns from './sortByColumns';
import striped from './striped';
import title from './title';

export default [
  importSyntax,
  basic,
  columnDef,
  sortByColumns,
  rowSelection,
  title,
  primaryColumn,
  columnAlign,
  density,
  striped,
  highContrast,
  scrollable,
  controlled,
  rtl,
  customCell,
  customColumnHeader,
  customRow,
  defaultSort,
  rowSelectionAndColumnDef,
  columnAlignWithSort,
  largeDataSets
  // kitchenSink
];
