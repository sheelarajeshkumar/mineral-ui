/* @flow */
import ButtonGroup from '../../../../../library/ButtonGroup';
import DemoLayout from '../../shared/DemoLayout';

export default {
  id: 'sizes',
  title: 'Sizes',
  description: `To provide hierarchy to actions on your page, change ButtonGroup impact with the \`size\` attribute.`,
  scope: { ButtonGroup, DemoLayout },
  source: `
    <DemoLayout>
      <ButtonGroup
        defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-1"
        size="small" />

      <ButtonGroup
        defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-2"
        size="medium" />

      <ButtonGroup
        defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-3" />

      <ButtonGroup
        defaultChecked="fluorite"
        data={[
          { label: 'Fluorite', value: 'fluorite' },
          { label: 'Magnetite', value: 'magnetite' },
          { label: 'Quartz', value: 'quartz' }
        ]}
        name="mineral-4"
        size="jumbo" />
    </DemoLayout>
  `
};
