/* @flow */
import Box from '../../../../../../library/Box';
import { DataTable } from '../../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'overflow',
  title: 'Overflow',
  description: `DataTable will allow horizontal scrolling by default when its
width is greater than that of its container. You can disable this behavior with
\`disableScrollOnOverflow\`.`,
  scope: { Box, DataTable, sharedData },
  source: `
    <Box width="50%">
      <DataTable data={sharedData} rowKey="Fruits" />
    </Box>`
};
