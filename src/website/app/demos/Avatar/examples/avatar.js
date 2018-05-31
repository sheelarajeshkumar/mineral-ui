/* @flow */
import Avatar from '../../../../../library/Avatar';
import IconCloud from 'mineral-ui-icons/IconCloud';
import DemoLayout from '../components/DemoLayout';
import Root from '../../../../../library/Root';
import { createStyledComponent } from '../../../../../library/styles';

const StyleObject = createStyledComponent(
  Root,
  {
    fontStyle: 'bold'
  },
  {
    withProps: {
      element: 'button'
    }
  }
);
const StyleFunction = createStyledComponent(Root, (p) => ({
  backgroundColor: p.theme.backgroundColor_themePrimary
}));

const DoubleStyleObject = createStyledComponent(StyleObject, {
  backgroundColor: 'yellow'
});

export default {
  id: 'basic',
  title: 'Basic Usage',
  description: `Avatar can display an image, a text character, or an
[Icon](/components/icon). For accessibility, please provide an \`alt\`/\`title\`
attribute for standalone Avatars.`,
  scope: {
    Avatar,
    DemoLayout,
    IconCloud,
    Root,
    StyleObject,
    StyleFunction,
    DoubleStyleObject
  },
  source: `
    <DemoLayout>
      <Root element='button' className='hello' css={{fontStyle: 'italic', outline: '1px dashed magenta'}}>Root</Root>
      <StyleObject className='hello' css={{fontStyle: 'italic', outline: '1px dashed magenta'}}>StyleObject</StyleObject>
      <StyleFunction className='hello' css={{fontStyle: 'italic', outline: '1px dashed magenta'}}>StyleFunction</StyleFunction>
      <DoubleStyleObject className='hello' css={{fontStyle: 'italic', outline: '1px dashed magenta'}}>DoubleStyleObject</DoubleStyleObject>

      <Avatar className='hello' css={{fontStyle: 'italic', outline: '1px dashed magenta'}}>
        <img src="/images/avatar.svg" alt="Allison" />
      </Avatar>
      <Avatar>Allison</Avatar>
      <Avatar>
        <IconCloud title="cloud" />
      </Avatar>
    </DemoLayout>`
};
