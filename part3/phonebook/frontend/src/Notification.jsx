const Notification = ({ message, type = 'success' }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`notification-banner -${type}`}>
      <span className="text">{message}</span>
    </div>
  )
}

export default Notification
