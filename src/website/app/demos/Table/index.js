/* @flow */
import { componentTheme as tableComponentTheme } from '../../../../library/Table/Table';
import { componentTheme as tableCellComponentTheme } from '../../../../library/Table/TableCell';
import { componentTheme as tableColumnHeaderComponentTheme } from '../../../../library/Table/TableColumnHeader';
import { componentTheme as tableHeaderComponentTheme } from '../../../../library/Table/TableHeader';
import { componentTheme as tableRowComponentTheme } from '../../../../library/Table/TableRow';
import { componentTheme as tableTitleComponentTheme } from '../../../../library/Table/TableTitle';

import examples from './examples';

const doc = require('!!react-docgen-loader!../../../../library/Table/Table');

import bestPractices from './bestPractices';

export default {
  bestPractices,
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
  whenHowToUse: `Table is best suited to data which a user will need to compare
data points or investigate relationships. For simpler data, consider a list
structure; for more complex data or user needs, consider data visualization,
possibly in addition to Table.

For Tables with many columns, [striped](#striped) rows can enhance readability.
Tables that do not have enough columns to fill the width can be hard to read and
should be displayed at a more appropriate width (perhaps using
[Box](/components/box) or other layout components).

Table is designed to optimize performance and minimize excess operations, but
rendering more than 100 rows is still not recommended.`
};
