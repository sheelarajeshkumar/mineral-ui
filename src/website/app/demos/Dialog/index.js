/* @flow */
import { componentTheme as dialogComponentTheme } from '../../../../library/Dialog/Dialog';
import { componentTheme as dialogActionsComponentTheme } from '../../../../library/Dialog/DialogActions';
import { componentTheme as dialogBodyComponentTheme } from '../../../../library/Dialog/DialogBody';
import { componentTheme as dialogTitleComponentTheme } from '../../../../library/Dialog/DialogTitle';

import dialogExamples from './examples/Dialog';
import dialogActionsExamples from './examples/DialogActions';
import dialogBodyExamples from './examples/DialogBody';
import dialogFooterExamples from './examples/DialogFooter';
import dialogHeaderExamples from './examples/DialogHeader';
import dialogTitleExamples from './examples/DialogTitle';

import bestPractices from './bestPractices';

const dialogDoc = require('!!react-docgen-loader!../../../../library/Dialog/Dialog');
const dialogActionsDoc = require('!!react-docgen-loader!../../../../library/Dialog/DialogActions');
const dialogBodyDoc = require('!!react-docgen-loader!../../../../library/Dialog/DialogBody');
const dialogFooterDoc = require('!!react-docgen-loader!../../../../library/Dialog/DialogFooter');
const dialogHeaderDoc = require('!!react-docgen-loader!../../../../library/Dialog/DialogHeader');
const dialogTitleDoc = require('!!react-docgen-loader!../../../../library/Dialog/DialogTitle');

export default [
  {
    bestPractices: bestPractices.dialog,
    componentTheme: dialogComponentTheme,
    doc: dialogDoc,
    examples: dialogExamples,
    slug: 'dialog',
    title: 'Dialog',
    whenHowToUse: `TODO`
  },
  {
    bestPractices: bestPractices.dialogActions,
    componentTheme: dialogActionsComponentTheme,
    doc: dialogActionsDoc,
    examples: dialogActionsExamples,
    slug: 'dialog-actions',
    title: 'DialogActions',
    whenHowToUse: `TODO`
  },
  {
    bestPractices: bestPractices.dialogBody,
    componentTheme: dialogBodyComponentTheme,
    doc: dialogBodyDoc,
    examples: dialogBodyExamples,
    slug: 'dialog-body',
    title: 'DialogBody',
    whenHowToUse: `TODO`
  },
  {
    bestPractices: bestPractices.dialogFooter,
    doc: dialogFooterDoc,
    examples: dialogFooterExamples,
    slug: 'dialog-footer',
    title: 'DialogFooter',
    whenHowToUse: `TODO`
  },
  {
    bestPractices: bestPractices.dialogHeader,
    doc: dialogHeaderDoc,
    examples: dialogHeaderExamples,
    slug: 'dialog-header',
    title: 'DialogHeader',
    whenHowToUse: `TODO`
  },
  {
    bestPractices: bestPractices.dialogTitle,
    componentTheme: dialogTitleComponentTheme,
    doc: dialogTitleDoc,
    examples: dialogTitleExamples,
    slug: 'dialog-title',
    title: 'DialogTitle',
    whenHowToUse: `TODO`
  }
];
