import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {title, date, id, isStarred} = appointmentDetails

  const onToggleStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-star-container">
        <p className="appointment-title">{title}</p>
        <button
          onClick={onToggleStar}
          type="button"
          className="star-button"
          data-testid="star"
        >
          <img
            src={
              isStarred
                ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
            }
            alt="star"
            className="star-icon"
          />
        </button>
      </div>
      <p className="appointment-date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
