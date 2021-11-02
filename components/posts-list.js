import { useState, useEffect } from 'react'
import { supabase } from '@/util/supabase'
import Link from 'next/link'
import Date from '@/components/date'

export const PostsList = () => {
    const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [posts, setPosts] = useState([])

	useEffect(() => {
		supabase.from('Posts').select('*')
		.then(
			(result) => {
				console.log('result', result)
				setIsLoading(!result.error && !result.data)
				setPosts(result.data)
			},
			(error) => {
				setIsLoading(false)
				setHasError(error)
			}
		)
	}, [])

	return (
		<section>
			<h2>Blog</h2>
			{isLoading && <Spinner />}
			{!isLoading &&
				<ul>
				{posts.map(({ id, date, title, slug }) => (
				<li key={id}>
					<Link href={`/posts/${slug}`}>
						<a>{title}</a>
					</Link>
					<br />
					<small>
						<Date dateString={date} />
					</small>
				</li>
				))}
				</ul>			
			}
		</section>
	)
}