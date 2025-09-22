import { NextResponse } from 'next/server'
import { removeToken } from 'util/server-only/cookies'

export async function POST() {
  await removeToken()
  return NextResponse.json({})
}