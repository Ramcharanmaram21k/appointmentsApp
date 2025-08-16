import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    showStarred: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleShowStarred = () => {
    this.setState(prevState => ({showStarred: !prevState.showStarred}))
  }

  onAddAppointments = event => {
    event.preventDefault()
    const {title, date, appointmentsList} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title,
      date,
    }))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  render() {
    const {title, date, appointmentsList, showStarred} = this.state
    const filteredAppointments = showStarred
      ? appointmentsList.filter(each => each.isStarred)
      : appointmentsList
    return (
      <div className="app-container">
        <div className="appointments-container">
          <div className="form-section">
            <form onSubmit={this.onAddAppointments}>
              <h1>Add Appointments</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                onChange={this.onChangeTitle}
                placeholder="Title"
                value={title}
              />

              <label htmlFor="date">DATE</label>
              <input type="date" onChange={this.onChangeDate} value={date} />

              <button type="submit">Add</button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>

          <div className="appointments-section">
            <div className="heading-starred-container">
              <h1>Appointments</h1>
              <button onClick={this.toggleShowStarred} type="button">
                Starred
              </button>
            </div>

            <div className="appointments-list">
              {filteredAppointments.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleStar={this.toggleStar}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
