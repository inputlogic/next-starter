export const LoadingIndicator = () => {
    return (
        <span className={`loading-ellipsis ${className ? className : ''}`}>
          <span>&bull;</span>
          <span>&bull;</span>
          <span>&bull;</span>
        </span>
      )
}