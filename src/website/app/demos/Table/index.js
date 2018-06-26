/* @flow */
// import { componentTheme as tableComponentTheme } from '../../../../library/Table/Table';
// import { componentTheme as tDComponentTheme } from '../../../../library/Table/TD';
// import { componentTheme as tFootComponentTheme } from '../../../../library/Table/TFoot';
// import { componentTheme as tHComponentTheme } from '../../../../library/Table/TH';
// import { componentTheme as tHeadComponentTheme } from '../../../../library/Table/THead';
// import { componentTheme as tRComponentTheme } from '../../../../library/Table/TR';

import dataTableExamples from './examples/DataTable';
// import tableExamples from './examples/Table';
// import tBodyExamples from './examples/TBody';
// import tDExamples from './examples/TD';
// import tFootExamples from './examples/TFoot';
// import tHExamples from './examples/TH';
// import tHeadExamples from './examples/THead';
// import tRExamples from './examples/TR';

const dataTableDoc = require('!!react-docgen-loader!../../../../library/Table/DataTable');
// const tableDoc = require('!!react-docgen-loader!../../../../library/Table/Table');
// const tBodyDoc = require('!!react-docgen-loader!../../../../library/Table/TBody');
// const tDDoc = require('!!react-docgen-loader!../../../../library/Table/TD');
// const tFootDoc = require('!!react-docgen-loader!../../../../library/Table/TFoot');
// const tHDoc = require('!!react-docgen-loader!../../../../library/Table/TH');
// const tHeadDoc = require('!!react-docgen-loader!../../../../library/Table/THead');
// const tRDoc = require('!!react-docgen-loader!../../../../library/Table/TR');

// import bestPractices from './bestPractices';

export default [
  // {
  //   bestPractices,
  //   componentTheme: tableComponentTheme,
  //   doc: tableDoc,
  //   examples: tableExamples,
  //   slug: 'table',
  //   title: 'Table',
  //   whenHowToUse: `Table TODO`
  // },
  {
    // bestPractices,
    doc: dataTableDoc,
    examples: dataTableExamples,
    slug: 'data-table',
    title: 'DataTable',
    whenHowToUse: `DataTable TODO`
  }
  // {
  //   doc: tBodyDoc,
  //   examples: tBodyExamples,
  //   slug: 'tbody',
  //   title: 'TBody',
  //   whenHowToUse: `TBody TODO`
  // },
  // {
  //   componentTheme: tDComponentTheme,
  //   doc: tDDoc,
  //   examples: tDExamples,
  //   slug: 'td',
  //   title: 'TD',
  //   whenHowToUse: `TD TODO`
  // },
  // {
  //   componentTheme: tFootComponentTheme,
  //   doc: tFootDoc,
  //   examples: tFootExamples,
  //   slug: 'tfoot',
  //   title: 'TFoot',
  //   whenHowToUse: `TFoot TODO`
  // },
  // {
  //   componentTheme: tHComponentTheme,
  //   doc: tHDoc,
  //   examples: tHExamples,
  //   slug: 'th',
  //   title: 'TH',
  //   whenHowToUse: `TH TODO`
  // },
  // {
  //   componentTheme: tHeadComponentTheme,
  //   doc: tHeadDoc,
  //   examples: tHeadExamples,
  //   slug: 'thead',
  //   title: 'THead',
  //   whenHowToUse: `THead TODO`
  // },
  // {
  //   componentTheme: tRComponentTheme,
  //   doc: tRDoc,
  //   examples: tRExamples,
  //   slug: 'tr',
  //   title: 'TR',
  //   whenHowToUse: `TR TODO`
  // }
];
