import {Plans} from 'components/billing/plans'
import {MyBilling} from 'components/billing/my-billing'

const Page = () => {
  return <div>
    <p>Note: Logging in is required for some billing components</p>
    <h3>Plans Component</h3>
    <Plans next='/demo/billing' nextCancelled='/demo/billing' />
    <br />
    <h3>MyBilling Component</h3>
    <MyBilling />
  </div>
}

Page.Layouts = ['DemoLayout']
export default Page
