import { TabBody, Tabs } from '@/components/tabs'

export const Stylesheet = () => {
  return (
    <>
      <Tabs
        tabs={[
          {
            name: 'buttons',
            label: 'Buttons',
            content: ButtonTab,
            initial: true,
          },
          { name: 'inputs', label: 'Text Inputs', content: InputTab },
        ]}
      />
    </>
  )
}

const ButtonTab = () => {
  return <div>Button tab content</div>
}

const InputTab = () => {
  return <div>Input tab content</div>
}
