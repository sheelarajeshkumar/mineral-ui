/* @flow */
import columnAlign from './columnAlign';
import columnAlignWithSort from './columnAlignWithSort';
import columnDef from './columnDef';
import controlled from './controlled';
import dataTable from './dataTable';
import defaultSort from './defaultSort';
import highContrast from './highContrast';
import importSyntax from './importSyntax';
import largeDataSets from './largeDataSets';
import overflow from './overflow';
import primaryColumn from './primaryColumn';
import rowSelection from './rowSelection';
import rowSelectionAndColumnDef from './rowSelectionAndColumnDef';
import rtl from './rtl';
import spacious from './spacious';
import sortByColumns from './sortByColumns';
import title from './title';
import zebraStriped from './zebraStriped';

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
  zebraStriped,
  highContrast,
  overflow,
  controlled,
  rtl,
  defaultSort,
  rowSelectionAndColumnDef,
  columnAlignWithSort,
  largeDataSets
];
