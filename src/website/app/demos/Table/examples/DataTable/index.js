/* @flow */
import columnAlign from './columnAlign';
import columnAlignWithSort from './columnAlignWithSort';
import columnDef from './columnDef';
import customCell from './customCell';
import customColumnHeader from './customColumnHeader';
import customRow from './customRow';
import controlled from './controlled';
import dataTable from './dataTable';
import defaultSort from './defaultSort';
import highContrast from './highContrast';
import importSyntax from './importSyntax';
import kitchenSink from './kitchenSink';
import largeDataSets from './largeDataSets';
import overflow from './overflow';
import primaryColumn from './primaryColumn';
import rowSelection from './rowSelection';
import rowSelectionAndColumnDef from './rowSelectionAndColumnDef';
import rtl from './rtl';
import spacious from './spacious';
import sortByColumns from './sortByColumns';
import striped from './striped';
import title from './title';

export default [
  importSyntax,
  dataTable,
  columnDef,
  sortByColumns,
  rowSelection,
  title,
  primaryColumn,
  columnAlign,
  spacious,
  striped,
  highContrast,
  overflow,
  controlled,
  rtl,
  customCell,
  customColumnHeader,
  customRow,
  defaultSort,
  rowSelectionAndColumnDef,
  columnAlignWithSort,
  largeDataSets,
  kitchenSink
];
