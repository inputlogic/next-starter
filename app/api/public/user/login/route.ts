import { NextRequest, NextResponse } from 'next/server'
import { axiosClient } from 'util/server-only/axios-client'
import { setToken } from 'util/server-only/cookies'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data: { token, ...rest } } = await axiosClient.post('/public/user/login', body)
    await setToken(token)
    return NextResponse.json({ ...rest, token: 'redacted' }, { status: 200 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      err.response?.data || { message: 'Internal server error' },
      { status: err.response?.status || 500 }
    )
  }
}