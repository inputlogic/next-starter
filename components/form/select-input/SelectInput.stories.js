import { SelectInput } from './select-input'

export default {
  title: 'Components/Form/SelectInput',
  component: SelectInput,
}

const Template = (args) => <SelectInput {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'sample-id',
  name: 'sample-name',
  label: 'Sample Label',
  placeholder: 'Select an option',
  defaultValue: '',
  options: [
    { value: 'option1', name: 'Option 1' },
    { value: 'option2', name: 'Option 2' },
    { value: 'option3', name: 'Option 3' },
  ],
  required: false,
}
