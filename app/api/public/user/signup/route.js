import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { axiosClient } from 'util/server-only/axios-client'
import { setToken } from 'util/server-only/cookies'

export async function POST(req) {
  try {
    const body = await req.json()
    const cookieStore = cookies()
    const code = cookieStore.get('referral')?.value
    
    const { data: { token, ...rest } } = await axiosClient.post('/public/user/signup', { 
      ...body, 
      code 
    })
    
    await setToken(token)
    return NextResponse.json({ ...rest, token: 'redacted' }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      err.response?.data || { message: 'Internal server error' },
      { status: err.response?.status || 500 }
    )
  }
}