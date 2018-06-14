/* @flow */
import { componentTheme as dialogComponentTheme } from '../../../../library/Dialog/Dialog';
import dialogExamples from './examples/Dialog';
import bestPractices from './bestPractices';
const dialogDoc = require('!!react-docgen-loader!../../../../library/Dialog/Dialog');

export default [
  {
    bestPractices: bestPractices.dialog,
    componentTheme: dialogComponentTheme,
    doc: dialogDoc,
    examples: dialogExamples,
    slug: 'dialog',
    title: 'Dialog',
    whenHowToUse: `TODO`
  }
];
