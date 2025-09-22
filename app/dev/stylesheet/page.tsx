'use client'

import { useState } from 'react'
import {
  TextInput,
  Textarea,
  SelectInput,
  DatePickerSelect,
  RadioButton,
  Checkbox,
  FileUpload,
  MultiSelect,
  ComboboxSearch,
} from 'components/inputs'
import { Button } from 'components/button'
import { Popover } from 'components/popover'
import { Pagination } from 'components/pagination/pagination'
import { Progress } from 'components/progress-bar/progress-bar'

export default function Stylesheet() {
  // MultiSelect state
  const [value, setValue] = useState([])

  // ComboboxSearch state
  const [searchValue, setSearchValue] = useState('')
  const [searchOptions, setSearchOptions] = useState([
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ])

  const setQuery = (query) => {
    if (!query) {
      setSearchOptions([
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ])
    } else {
      const lowerQuery = query.toLowerCase()
      setSearchOptions(
        searchOptions.filter((option) =>
          option.label.toLowerCase().includes(lowerQuery)
        )
      )
    }
  }

  return (
    <div
      className="container"
      style={{
        maxWidth: '600px',
      }}
    >
      <h1>Stylesheet</h1>
      <h2>Form Fields</h2>
      <TextInput label="text input" placeholder="Type here" />
      <TextInput
        label="text input w/ error"
        defaultValue="invalid entry"
        error="Im broken"
      />
      <Textarea label="text area" />
      <Textarea
        label="text area w/ error"
        defaultValue="Some text"
        error="Too little text"
      />
      <SelectInput
        label="Select field"
        placeholder="Select an option"
        options={[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ]}
      />
      <SelectInput
        label="Select field w/ error"
        placeholder="Select an option"
        defaultValue={2}
        options={[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ]}
        error="Wrong choice"
      />
      <DatePickerSelect label="DatePicker" placeholder="Select a date" />
      <DatePickerSelect label="DatePicker w/ error" error="Wrong date" />
      <RadioButton label="Radio Button" />
      <RadioButton label="Radio Button (selected)" defaultValue={true} />
      <Checkbox label="checkbox" name="test" />
      <Checkbox label="checkbox (selected)" name="test" defaultValue={true} />
      <FileUpload label="Upload file" />
      <h2>Buttons</h2>
      <Button variation="primary">Primary Button</Button>
      <Button variation="secondary">Secondary Button</Button>
      <Button variation="outline">Outline Button</Button>
      <Button variation="icon" icon="chevron-down" iconPosition="left">
        Icon button
      </Button>
      <Button variation="outline" icon="search">
        Outline button w/ Icon
      </Button>
      <Button isLoading variation="outline" loadingText="Im in a loading state">
        Button text
      </Button>
      <Button variation="secondary" size="small">
        Small button
      </Button>
      <br />
      <br />
      <Button fullWidth>Full width button</Button>

      <h2>Popover component</h2>
      <div
        style={{
          width: '200px',
          border: '1px solid grey',
          padding: '20px',
          background: '#efefef',
        }}
      >
        <Popover trigger="Click me">
          <p>I go inside the popover</p>
        </Popover>
      </div>

      <h2>Pagination</h2>
      <Pagination totalPages={5} currentPage={2} />

      <h2>Progress</h2>
      <Progress progress={33} />

      <h2>MultiSelect</h2>
      <MultiSelect
        value={value}
        onChange={(val) => setValue(val)}
        label="Multiple Select Input"
        placeholder="Select options"
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
      />
      <h2>MultiSelect with error</h2>
      <MultiSelect
        value={value}
        onChange={(val) => setValue(val)}
        label="Multiple Select Input with Error"
        placeholder="Select options"
        options={[{ label: 'Option 1', value: 'option1' }]}
        error="This is an error message"
      />
      <h2>MultiSelect disabled</h2>
      <MultiSelect
        value={[{ label: 'Option 1', value: 'option1' }]}
        onChange={(val) => setValue(val)}
        label="Multiple Select Input (disabled)"
        placeholder="Select options"
        options={[{ label: 'Option 1', value: 'option1' }]}
        disabled
      />

      <h2>Combobox Search</h2>
      <ComboboxSearch
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
        setQuery={setQuery}
        label="Search Options"
        placeholder="Search options"
        options={searchOptions}
        isLoading={false}
      />
      <ComboboxSearch
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
        setQuery={setQuery}
        label="Search Options with Error"
        placeholder="Search options"
        options={searchOptions}
        isLoading={false}
        error="This is an error message"
      />
      <ComboboxSearch
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
        setQuery={setQuery}
        label="Search Options (disabled)"
        placeholder="Search options"
        options={searchOptions}
        isLoading={false}
        disabled={true}
      />
      <ComboboxSearch
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
        setQuery={setQuery}
        label="Search Options (loading)"
        placeholder="Search options"
        options={searchOptions}
        isLoading={true}
      />
    </div>
  )
}
