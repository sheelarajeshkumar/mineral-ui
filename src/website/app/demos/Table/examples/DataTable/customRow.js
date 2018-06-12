/* @flow */
import { createStyledComponent } from '../../../../../../library/styles';
import { withTheme } from '../../../../../../library/themes';
import { DataTable } from '../../../../../../library/Table';
import { componentTheme as tDTheme } from '../../../../../../library/Table/TD';
import { componentTheme as tRTheme } from '../../../../../../library/Table/TR';
import renderPropDescription from '../../../shared/renderPropDescription';
import sharedRows from '../shared/data';

export default {
  id: 'custom-row',
  title: 'Custom Row',
  description: `Use the \`row\`
[render prop](https://reactjs.org/docs/render-props.html) as a row property
to provide custom rendering control of the [TR](/components/tr) for that row.

${renderPropDescription}

Some things to keep in mind:

1. Because you are rendering a table row, the rendered root element _must_ be a
   \`tr\`.
1. Remember to accommodate the appearance-related DataTable props, like
   [\`highContrast\`](#high-contrast),
   [\`isSelected\`](#row-selection), [\`spacious\`](#spacious), and
   [\`zebraStriped\`](#zebra-striped).
1. If your app supports RTL languages, you can use \`theme.direction\` to
   conditionally apply the necessary styles.`,
  scope: {
    createStyledComponent,
    DataTable,
    sharedRows,
    tDTheme,
    tRTheme,
    withTheme
  },
  source: `
    () => {
      /**
       * If you wish to use theme variables in your function, you must either use
       * createStyledComponent or the withTheme HOC, (higher order component),
       * which provides the base theme as a prop.
       *   import { withTheme } from 'mineral-ui/themes';
       *
       * If you wish to access a component specific theme, you'll need to import
       * it and compose it with the base theme as shown below.
       *   import { componentTheme as tRTheme } from 'mineral-ui/Table/TD';
       */
      const customRow = ({ props }) => {
        const { key, highContrast, spacious, zebraStriped } = props;

        const CustomRow = withTheme(({ theme: baseTheme }) => {
          const theme = {
            ...tDTheme(baseTheme),
            ...tRTheme(baseTheme)
          };
          const paddingVertical = spacious
            ? theme.TD_paddingVertical_spacious
            : theme.TD_paddingVertical;

          const Root = createStyledComponent('tr', {
            backgroundColor: theme.well_backgroundColor_warning,

            '&:not(:last-child)': {
              borderBottom: highContrast
                ? theme.TR_borderHorizontal_highContrast
                : theme.TR_borderHorizontal
            },

            '&:nth-child(even):not(:hover)': {
              backgroundColor:
                zebraStriped
                  ? theme.TR_backgroundColor_zebraStriped
                  : null
            }
          });

          const Cell = createStyledComponent('td', {
            padding: paddingVertical + ' ' + theme.TD_paddingHorizontal
          });

          const Divider = createStyledComponent('hr', {
            backgroundColor: theme.color_warning,
            border: 0,
            height: 1
          })

          const numCells = Object.keys(rows[0]).length;

          return (
            <Root {...props}>
              <Cell colSpan={numCells}><Divider /></Cell>
            </Root>
          );
        });

        return <CustomRow key={key} />;
      }

      const rows = [
        sharedRows[0],
        sharedRows[1],
        { row: customRow },
        sharedRows[2],
        sharedRows[3]
      ];

      return (
        <DataTable
          rows={rows}
          rowKey="Fruits" />
      );
    }`
};
