import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_API_URL
const supabaseKey = process.env.NEXT_PUBLIC_API_KEY

export const fetcher = (url, token) =>
	fetch(url, {
		method: 'GET',
		headers: new Headers({ 'Content-Type': 'application/json', token }),
		credentials: 'same-origin',
	}).then((res) => res.json())

export const supabase = createClient(supabaseUrl, supabaseKey)