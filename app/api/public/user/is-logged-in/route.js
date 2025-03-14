import { NextResponse } from 'next/server'
import { getToken } from 'util/server-only/cookies'

export async function GET() {
  const token = await getToken()
  return NextResponse.json({
    isLoggedIn: Boolean(token)
  })
}