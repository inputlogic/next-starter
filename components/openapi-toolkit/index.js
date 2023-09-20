import { useQuery } from 'react-query'
import { useUser } from 'hooks/use-user'
import { get } from 'util/api'
import { openapi } from 'util/openapi'

export const useDjangoList = (url, reactQueryArgs = {}) => {
  const [user] = useUser()
  const reactQuery = useQuery(
    [url],
    () => get(url, { token: user?.token }),
    reactQueryArgs
  )
  return [
    reactQuery.data?.results,
    { ...reactQuery, count: reactQuery.data?.count },
  ]
}

console.log('OpenApiToolkit2', openapi)

export const OpenAPIToolkit = () => {
  // const path = '/public/user/signup'
  const path = '/user/payment/my-vehicles/{id}'
  const method = 'patch'

  const lots = openapi.queries.usePublicInfrastructureLots()
  const [lot] = openapi.queries.usePublicInfrastructureLotsDetail(
    {
      args: { id: 90 },
    },
    { enabled: false }
  )

  const loginMutation = openapi.mutations.usePublicUserLoginMutation()

  const LoginForm = openapi.forms.publicUserLogin.post.AutoForm
  const StallForm =
    openapi.forms.mapAdminInfrastructureStallPricesDetail.patch.AutoForm

  const VehicleForm = openapi.forms.userPaymentMyVehiclesDetail.patch.AutoForm

  const VehiclesTable = openapi.tables.userPaymentMyVehicles.Table

  // console.log('yo', lot)

  // const OpenForm = useOpenAPIForm({ path, method })
  // const OpenForm = OpenApiToolkit.forms[path][method]
  // const AutoForm = OpenForm.AutoForm

  // const ParkingLotTable = OpenApiToolkit.tables['/public/infrastructure/lots']
  // const ForgotStep1Form =
  //   OpenApiForms['/public/user/forgot-password-step-1']['post']

  return (
    <div>
      <h1>OpenAPI Toolkit</h1>
      <ul>
        <li>urls ✅</li>
        <li>http methods ✅</li>
        <li>query hooks ✅</li>
        <li>mutation hooks ✅</li>
        <li>forms</li>
        <li>tables</li>
        <li>pagination</li>
        <li>pages</li>
      </ul>
      <LoginForm />
      <VehicleForm id={114} />
      <VehiclesTable />
      <button
        onClick={async () => {
          console.log('testing')
          const res = await loginMutation.mutateAsync({
            email: 'hello',
            password: 'there',
          })
          console.log('response', res)
        }}
      >
        Login
      </button>
    </div>
  )
}
