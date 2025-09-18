import { TextInput, SubmitButton, Checkbox, RadioButton, Form, useForm } from 'components/form'
import { Checkbox as ManualCheckbox } from 'components/inputs'
// @ts-expect-error - hookform resolver types issue
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Form> = {
  title: 'Components/Form/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Form>

const wait = async (timeout: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, timeout))

const Template = () => {
  const methods = useForm({
    resolver: yupResolver(
      y.object().shape({
        textInput: y.string().required('Text Input is a required field'),
      })
    ),
    onSubmit: async (data: Record<string, unknown>) => {
      await wait(3000)
      alert(`onSubmit: ${JSON.stringify(data)}`)
    }
  })
  const data = methods.watch()
  return <div>
    <Form methods={methods} >
      <TextInput name='textInput' />
      <TextInput name='nested.nestedInputExample' />
      <Checkbox name='automaticCheckbox' />
      <ManualCheckbox label='Manual Checkbox' {...methods.register('manualCheckbox')} />
      <fieldset>
        <RadioButton name='color' value='red' />
        <RadioButton name='color' value='green' />
        <RadioButton name='color' value='blue' />
      </fieldset>
      <SubmitButton>Submit</SubmitButton>
    </Form>
    <div style={{padding: '1em', border: '1px solid #efefef', borderRadius: '1em', marginTop: '2em'}} >
      <p style={{fontStyle: 'italic', fontSize: '12px'}} >Preview of the form data that will be included in onSubmit</p>
      <pre style={{padding: '1em', backgroundColor: '#efefef', borderRadius: '0.5em'}} >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  </div>
}

export const Default: Story = {
  render: Template,
  args: {}
}