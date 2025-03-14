import { NextResponse } from 'next/server'
import { getToken, getSessionValue } from 'util/server-only/cookies'

export async function GET() {
  const token = await getToken()
  const isAdmin = await getSessionValue('isAdmin') || false
  
  return NextResponse.json({
    isLoggedIn: Boolean(token),
    isAdmin
  })
}