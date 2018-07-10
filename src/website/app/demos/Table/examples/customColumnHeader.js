/* @flow */
import { palette } from 'mineral-ui-tokens';
import { createStyledComponent } from '../../../../../library/styles';
import { withTheme } from '../../../../../library/themes';
import Table from '../../../../../library/Table';
import { componentTheme as tableColumnHeaderTheme } from '../../../../../library/Table/TableColumnHeader';
import renderPropDescription from '../../shared/renderPropDescription';
import sharedData from '../shared/data';

export default {
  id: 'custom-column-header',
  title: 'Custom Column Header',
  description: `Use the \`cell\`
[render prop](https://reactjs.org/docs/render-props.html) in a column definiton
to provide custom rendering control of all [THs](/components/th) in that
column.

${renderPropDescription}

Some things to keep in mind:

1. Because you are rendering a table column header, the rendered root element
   _must_ be either a \`th\` (recommended) or a \`td\`.
1. Remember to accommodate the appearance-related Table props, like
   [\`highContrast\`](#high-contrast), [\`spacious\`](#spacious), and
   [\`striped\`](#zebra-striped).
1. If your app supports RTL languages, you can use \`theme.direction\` to
   conditionally apply the necessary styles.`,
  scope: {
    createStyledComponent,
    Table,
    palette,
    sharedData,
    tableColumnHeaderTheme,
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
       *   import { componentTheme as tableColumnHeaderTheme } from 'mineral-ui/Table/TableColumnHeader';
       */
      const header = ({ props }) => {
        const { children, highContrast, key, label, spacious, textAlign } = props;

        const CustomColumnHeader = withTheme(({ theme: baseTheme }) => {
          const theme = tableColumnHeaderTheme(baseTheme);
          const fontSize = theme.TableColumnHeader_fontSize;
          const paddingVertical = spacious
            ? theme.TableColumnHeader_paddingVertical_spacious
            : theme.TableColumnHeader_paddingVertical;
          const rtl = theme.direction === 'rtl';
          let rtlTextAlign;
          if ((rtl && textAlign == 'start') || (!rtl && textAlign == 'end')) {
            rtlTextAlign = 'right';
          } else if ((rtl && textAlign == 'end') || textAlign == 'start') {
            rtlTextAlign = 'left';
          }

          const Root = createStyledComponent('th', {
            padding: paddingVertical + ' ' + theme.TableColumnHeader_paddingHorizontal,

            '&:not(:first-child)': {
              borderLeft: rtl
                ? null
                : highContrast
                  ? theme.TableColumnHeader_borderVertical_highContrast
                  : theme.TableColumnHeader_borderVertical,
              borderRight: !rtl
                ? null
                : highContrast
                  ? theme.TableColumnHeader_borderVertical_highContrast
                  : theme.TableColumnHeader_borderVertical
            },
          });

          const Inner = createStyledComponent('span', {
            display: 'flex'
          });

          const Veggie = createStyledComponent('span', {
            display: 'inline-block',
            marginRight: rtl ? theme.space_inline_sm : null,
            marginRight: rtl ? null : theme.space_inline_sm
          });

          const Content = createStyledComponent('span', {
            fontSize,
            fontWeight: theme.TableColumnHeader_fontWeight,
            textAlign: rtlTextAlign
          });

          const veggies = ['🍆', '🥒', '🍠', '🌿'];

          const rootProps = {
            'aria-label': label,
            ...props
          };

          return (
            <Root {...rootProps}>
              <Inner>
                <Veggie>{veggies[Math.floor(Math.random()*veggies.length)]}</Veggie>
                <Content>{children}</Content>
              </Inner>
            </Root>
          );
        });

        return <CustomColumnHeader key={key} />;
      };

      const columns = [
        { content: 'Fruits', key: 'Fruits' },
        { content: 'Vegetables', key: 'Vegetables', header },
        { content: 'Grains', key: 'Grains' },
        { content: 'Dairy', key: 'Dairy' },
        { content: 'Protein', key: 'Protein' }
      ];

      return (
        <Table
          columns={columns}
          data={sharedData}
          rowKey="Fruits"
          title="Delicious Foods"
          hideTitle />
      );
    }`
};
