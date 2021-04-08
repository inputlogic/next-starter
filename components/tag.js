export const Tag = ({ name }) => {
  const tagType = name.replace(/\s+/g, '-').toLowerCase()
  return (
	<span className={`tag ${tagType}`}>{name}</span>
  )
}
