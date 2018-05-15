/* @flow */
import Box from '../../../../../library/Box';
import Table from '../../../../../library/Table';
import sharedData from '../shared/data';

export default {
  id: 'overflow',
  title: 'Overflow',
  description: `Table will allow horizontal scrolling by default when its
width is greater than that of its container. You can disable this behavior with
\`disableScrollOnOverflow\`.`,
  scope: { Box, Table, sharedData },
  source: `
    <Box width="50%">
      <Table data={sharedData} rowKey="Fruits" />
    </Box>`
};
