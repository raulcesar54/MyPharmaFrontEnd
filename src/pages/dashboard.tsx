import { Mark } from 'layout'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useDispatch } from 'react-redux'
import { api } from 'services'

const Dashboard = ({ mark, productCategory, product }: any) => {
  console.log({ mark, productCategory, product })
  return <Mark {...mark} />
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth:token': token } = parseCookies(ctx)
  const { data: dataToken } = JSON.parse(token)
  const { data: mark } = await api.get(
    '/mark',
    {},
    {
      headers: { Authorization: `Bearer ${dataToken.token}` },
    }
  )
  const { data: productCategory } = await api.get(
    '/product/category',
    {},
    {
      headers: { Authorization: `Bearer ${dataToken.token}` },
    }
  )
  const { data: product } = await api.get(
    '/product',
    {},
    {
      headers: { Authorization: `Bearer ${dataToken.token}` },
    }
  )
  return {
    props: { mark, productCategory, product },
  }
}
