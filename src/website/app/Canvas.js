/* @flow */
import React from 'react';
import { createStyledComponent } from '../../library/styles';

type Props = {};

const Root = createStyledComponent('div', {
  bottom: 0,
  left: 'calc(-50vw + 50%)',
  position: 'absolute',
  right: 'calc(-50vw + 50%)',
  top: 0,
  zIndex: '-1'
});

const Triangles = createStyledComponent('div', {
  backgroundImage: 'url(/images/triangles.svg)',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  bottom: 0,
  left: 0,
  // mixBlendMode: 'normal',
  // mixBlendMode: 'lumosity',
  mixBlendMode: 'hard-light', // meh
  // mixBlendMode: 'lighten', // meh
  // mixBlendMode: 'color-dodge', // changes slate
  // mixBlendMode: 'overlay', // changes slate
  // mixBlendMode: 'screen', // changes slate
  position: 'absolute',
  right: 0,
  top: 0
});

export default function Canvas({ ...restProps }: Props) {
  return (
    <Root {...restProps}>
      <Triangles />
    </Root>
  );
}

{
  /* <filter id="duotone_peachypink">
  <!-- <feColorMatrix type="matrix" result="grayscale" values="1 0 0 1 0
  1 0 0 1 0
  1 0 0 1 0
  0 0 0 1 0"></feColorMatrix> -->
  <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
    <!-- siteColor: original homepage heading; hsl(199,35%,31%); rgba(45, 78, 93, 1); -->
    <!-- siteColor: lighter orange; #FFBBA2 RGBA(255, 187, 162, 1) -->
    <!-- <feFuncR type="table" tableValues="0.1764705882 1"></feFuncR>
    <feFuncG type="table" tableValues="0.3058823529 0.7333333333"></feFuncG>
    <feFuncB type="table" tableValues="0.3647058824 0.6352941176"></feFuncB> -->
    <!-- siteColor: original homepage heading; hsl(199,35%,31%); rgba(45, 78, 93, 1); -->
    <!-- siteColor: yellow; #F0B241; RGBA(240, 178, 65, 1) -->
    <!-- <feFuncR type="table" tableValues="0.1764705882 0.9411764705"></feFuncR>
    <feFuncG type="table" tableValues="0.3058823529 0.6980392156"></feFuncG>
    <feFuncB type="table" tableValues="0.3647058824 0.2549019608"></feFuncB> -->
    <!-- siteColor: original homepage heading; hsl(199,35%,31%); rgba(45, 78, 93, 1); -->
    <!-- siteColor: orangePunch; #d44511; RGBA(212, 69, 17, 1) -->
    <!-- <feFuncR type="table" tableValues="0.1764705882 0.8313725490"></feFuncR>
    <feFuncG type="table" tableValues="0.3058823529 0.2705882353"></feFuncG>
    <feFuncB type="table" tableValues="0.3647058824 0.0666666667"></feFuncB> -->
    <!-- siteColor: original homepage heading; hsl(199,35%,31%); rgba(45, 78, 93, 1); -->
    <!-- siteColor: orangePunch_hover; #ec4d13; RGBA(236, 77, 19, 1) -->
    <!-- <feFuncR type="table" tableValues="0.1764705882 0.9254901961"></feFuncR>
    <feFuncG type="table" tableValues="0.3058823529 0.3019607843"></feFuncG>
    <feFuncB type="table" tableValues="0.3647058824 0.0745098039"></feFuncB> -->
    <!-- siteColor: original homepage heading; hsl(199,35%,31%); rgba(45, 78, 93, 1); -->
    <!-- siteColor: orange; #ed774c; RGBA(237, 119, 76, 1) -->
    <!-- <feFuncR type="table" tableValues="0.1764705882 0.9294117647"></feFuncR>
    <feFuncG type="table" tableValues="0.3058823529 0.4666666667"></feFuncG>
    <feFuncB type="table" tableValues="0.3647058824 0.2980392157"></feFuncB> -->
    <!-- siteColor: slate; #598296; RGBA(89, 130, 150, 1) -->
    <!-- siteColor: orange; #ed774c; RGBA(237, 119, 76, 1) -->
    <!-- <feFuncR type="table" tableValues="0.3490196078 0.9294117647"></feFuncR>
    <feFuncG type="table" tableValues="0.5098039216 0.4666666667"></feFuncG>
    <feFuncB type="table" tableValues="0.5882352941 0.2980392157"></feFuncB> -->
    <!-- peachypink -->
    <!-- <feFuncR type="table" tableValues="0.7411764706 0.9882352941"></feFuncR>
    <feFuncG type="table" tableValues="0.0431372549 0.7333333333"></feFuncG>
    <feFuncB type="table" tableValues="0.568627451 0.05098039216"></feFuncB> -->
    <feFuncA type="table" tableValues="1 1"></feFuncA>
  </feComponentTransfer>
</filter> */
}
