import { TabBody, Tabs } from '@/components/tabs'
import { Button } from '../button'

export const Stylesheet = () => {
  return (
    <>
      <Tabs
        tabs={[
          {
            name: 'buttons',
            label: 'Button examples',
            content: ButtonTab,
            initial: true,
          },
          { name: 'inputs', label: 'Text input examples', content: InputTab },
        ]}
      />
    </>
  )
}

const ButtonTab = () => {
  return (
    <div>
      <h3>Button Styles</h3>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Primary Large"
          variation="primary"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Primary Large (disabled)"
          variation="primary"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Secondary Large"
          variation="secondary"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Secondary Large (disabled)"
          variation="secondary"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Primary Outline Large"
          variation="primary-outline"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Primary Outline Large (disabled)"
          variation="primary-outline"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '4rem' }}>
        <Button
          text="Secondary Outline Large"
          variation="secondary-outline"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Secondary Outline Large (disabled)"
          variation="secondary-outline"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Primary Small"
          variation="primary"
          size="small"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Primary Small (disabled)"
          variation="primary"
          size="small"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Secondary Small"
          variation="secondary"
          size="small"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Secondary Small (disabled)"
          variation="secondary"
          size="small"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Primary Outline Small"
          variation="primary-outline"
          size="small"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Primary Outline Small (disabled)"
          variation="primary-outline"
          size="small"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '4rem' }}>
        <Button
          text="Secondary Outline Small"
          variation="secondary-outline"
          size="small"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Secondary Outline Small (disabled)"
          variation="secondary-outline"
          size="small"
          disabled={true}
        />
      </div>

      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Primary X-Small"
          variation="primary"
          size="xsmall"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Primary X-Small (disabled)"
          variation="primary"
          size="xsmall"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Secondary X-Small"
          variation="secondary"
          size="xsmall"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Secondary X-Small (disabled)"
          variation="secondary"
          size="xsmall"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Primary Outline X-Small"
          variation="primary-outline"
          size="xsmall"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Primary Outline X-Small (disabled)"
          variation="primary-outline"
          size="xsmall"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '4rem' }}>
        <Button
          text="Secondary Outline X-Small"
          variation="secondary-outline"
          size="xsmall"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Secondary Outline X-Small (disabled)"
          variation="secondary-outline"
          size="xsmall"
          disabled={true}
        />
      </div>

      <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
        <Button
          text="Text Button"
          variation="text"
          icon="search"
          iconFill="filled"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Text Button (disabled)"
          variation="text"
          icon="search"
          iconFill="filled"
          disabled={true}
        />
      </div>
      <div style={{ display: 'flex', marginBottom: '4rem' }}>
        <Button
          text="Text Button"
          variation="text"
          style={{ marginRight: '1rem' }}
        />
        <Button
          text="Text Button (disabled)"
          variation="text"
          disabled={true}
        />
      </div>
    </div>
  )
}

const InputTab = () => {
  return <div>Input tab content</div>
}
