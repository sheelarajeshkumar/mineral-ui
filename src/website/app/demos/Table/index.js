/* @flow */
import { componentTheme as tableComponentTheme } from '../../../../library/Table/Table';
import { componentTheme as tableCellComponentTheme } from '../../../../library/Table/TableCell';
import { componentTheme as tableColumnHeaderComponentTheme } from '../../../../library/Table/TableColumnHeader';
import { componentTheme as tableHeaderComponentTheme } from '../../../../library/Table/TableHeader';
import { componentTheme as tableRowComponentTheme } from '../../../../library/Table/TableRow';
import { componentTheme as tableTitleComponentTheme } from '../../../../library/Table/TableTitle';

import examples from './examples';

const doc = require('!!react-docgen-loader!../../../../library/Table/Table');

// import bestPractices from './bestPractices';

export default {
  // bestPractices,
  componentTheme: [
    tableComponentTheme,
    tableCellComponentTheme,
    tableColumnHeaderComponentTheme,
    tableHeaderComponentTheme,
    tableRowComponentTheme,
    tableTitleComponentTheme
  ],
  doc,
  examples,
  slug: 'table',
  title: 'Table',
  whenHowToUse: `Table TODO`
};
