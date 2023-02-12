import { Field } from 'components/form/field'

export default {
  title: 'Form/Field',
  tags: ['autodocs'],
  component: Field,
}

const Template = (props) => <Field {...props} />

export const Basic = Template.bind({})
export const TextField = Template.bind({})
export const TextFieldWithError = Template.bind({})

Basic.args = {
  label: 'This is the label',
  hint: 'This is a hint',
  children: (
    <div style={{ background: '#afafaf', padding: '0.5em' }}>Children</div>
  ),
}

TextField.args = {
  label: 'Full Name',
  hint: 'This is a hint',
  htmlFor: 'example-id',
  children: <input placeholder="eg. John Doe" id="example-id" />,
}

TextFieldWithError.args = {
  ...TextField.args,
  error: 'This is an error.',
}
