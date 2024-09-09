import Link from 'next/link'

export const DemoPage = () => {
  return <div>
    <h2>Demo</h2>
    <div>
      <Link href='/demo/modals'>Modals</Link>
    </div>
  </div>
}

DemoPage.Layouts = ['DemoLayout']
export default DemoPage
