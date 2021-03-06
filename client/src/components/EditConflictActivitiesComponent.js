import React, {Component, Fragment} from "react";
import {Breadcrumb, BreadcrumbItem, Button, Col, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {Link} from "react-router-dom";
import serverApi from "../api/serverApi";

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']


const ActivityDateAndTime = ({start, finish}) => {
    let startDateTime = new Date(start)
    let startTime = ('0' + startDateTime.getHours()).slice(-2) + ':' + ('0' + startDateTime.getMinutes()).slice(-2)
    let startDate = `${startDateTime.getDate()} ${months[startDateTime.getMonth()]} ${startDateTime.getUTCFullYear()}`
    let finishDateTime = new Date(finish)
    let finishTime = ('0' + finishDateTime.getHours()).slice(-2) + ':' + ('0' + finishDateTime.getMinutes()).slice(-2)
    let finishDate = `${finishDateTime.getDate()} ${months[finishDateTime.getMonth()]} ${finishDateTime.getUTCFullYear()}`
    return(
        <Fragment>
            <p>{`${startDate}, ${startTime} -`}</p>
            <p>{`${finishDate}, ${finishTime}`}</p>
        </Fragment>
    )
}

const RenderActivity = ({activities}) => {
    let order = 1;
    activities.sort((activity1, activity2) => {
        const activityTime1 = new Date(activity1.start).getTime()
        const activityTime2 = new Date(activity2.start).getTime()
        return activityTime1 - activityTime2
    })
    return activities.map((activity) => {
        return (
            <tr>
                <th scope="row">
                    <p>{order++}</p>
                </th>
                <td className="col-4">
                    <p>{activity.name}</p>
                </td>
                <td className="col-5">
                    <p>{activity.description}</p>
                </td>
                <td className="col-3">
                    <ActivityDateAndTime start={activity.start} finish={activity.finish}/>
                </td>
            </tr>
        )
    })
}

const RenderConflictEvent = ({event}) => {
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 conflictTableTitle p-2 mt-5">
                    <h5><Link className="text-decoration-none" to={`/event/${event.eventId}`}>{event.eventName}</Link></h5>
                </div>
                <Table hover>
                    <thead>
                    <tr>
                        <th>
                        </th>
                        <th>
                            Название
                        </th>
                        <th>
                            Описание
                        </th>
                        <th>
                            Время
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <RenderActivity activities={event.activities}/>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

class EditConflictActivities extends Component{
    constructor(props) {
        super(props);
        this.conflictEvents = [];
        this.state = {
            eventData: JSON.parse(sessionStorage.getItem('editEventData')),
            changed: JSON.parse(sessionStorage.getItem('changedEventData')),
            isErrorWindowOpen: false,
            errorMessage: ''
        }
        this.eventId = this.state.eventData.id
        this.divideActivitiesByEvents(JSON.parse(sessionStorage.getItem('editConflictActivities')))

        this.toggleErrorWindow = this.toggleErrorWindow.bind(this)
        this.editEvent = this.editEvent.bind(this)
    }

    toggleErrorWindow(){
        this.setState({isErrorWindowOpen: !this.state.isErrorWindowOpen})
    }

    divideActivitiesByEvents(activities){
        for (let i=0; i<activities.length; i++){
            this.addActivityToEvent(activities[i])
        }
    }

    addActivityToEvent(activity){
        let exists = false
        for (let i=0; i<this.conflictEvents.length; i++){
            if (this.conflictEvents[i].eventId === activity.event.id){
                this.conflictEvents[i].activities.push(activity)
                exists = true
            }
        }
        if (!exists){
            this.conflictEvents.push({
                eventId: activity.event.id,
                eventName: activity.event.name,
                activities: [activity]
            })
        }
    }

    editEventData(accountId, data){
        serverApi.editEvent(accountId, this.eventId, data).then(response => {
                if (response) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                if (error.response) {
                    if (typeof error.response.data === 'object')
                        throw new Error("Неизвестная ошибка")
                    throw new Error(error.response.data)
                }
                throw new Error(error.message);
            })
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    editActivity(accountId, activityId, data){
        serverApi.editActivity(accountId, this.eventId, activityId, data).then(response => {
                if (response) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                if (error.response) {
                    if (typeof error.response.data === 'object')
                        throw new Error("Неизвестная ошибка")
                    throw new Error(error.response.data)
                }
                throw new Error(error.message);
            })
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    deleteActivity(accountId, activityId){
        serverApi.deleteActivity(accountId, this.eventId, activityId).then(response => {
                if (response) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                if (error.response) {
                    if (typeof error.response.data === 'object')
                        throw new Error("Неизвестная ошибка")
                    throw new Error(error.response.data)
                }
                throw new Error(error.message);
            })
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    addActivities(data){
        serverApi.addActivities(this.eventId, data).then(response => {
                if (response) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                if (error.response) {
                    if (typeof error.response.data === 'object')
                        throw new Error("Неизвестная ошибка")
                    throw new Error(error.response.data)
                }
                throw new Error(error.message);
            })
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    editEvent(){
        console.log("I am here")
        const accountId = localStorage.getItem('userId')
        console.log("Storage ;", accountId)
        let activitiesToAdd = []
        if (this.state.changed.name || this.state.changed.description){
            const data = {
                name: this.state.eventData.name,
                description: this.state.eventData.description
            }
            this.editEventData(accountId, data)
        }
        for (let i=0; i<this.state.changed.activities.length; i++){
            let activityId = this.state.eventData.activities[i].id
            if (this.state.changed.activities[i]){
                const activity = this.state.eventData.activities[i]
                const startDateAndTime = this.splitDateTime(activity.start)
                const finishDateAndTime = this.splitDateTime(activity.finish)
                const data = {
                    name: activity.name,
                    description: activity.description,
                    startDate: startDateAndTime.date,
                    startTime: startDateAndTime.time,
                    finishDate: finishDateAndTime.date,
                    finishTime: finishDateAndTime.time
                }
                if (activityId !== undefined) {
                    this.editActivity(accountId, activityId, data)
                }
                else {
                    activitiesToAdd.push(data)
                }
            }
        }
        this.state.activitiesToDelete.map(activityId => {
            this.deleteActivity(accountId, activityId)
        })
        if (activitiesToAdd.length > 0){
            this.addActivities(activitiesToAdd)
        }
        window.location = '/home'
    }

    render() {
        const renderEvents = this.conflictEvents.map(event => {
            return <RenderConflictEvent event={event}/>
        })

        console.log(this.state)
        return(
            <div>
                <div className="breadcrumb">
                    <div className="container">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to={"/home"}>
                                    Мои мероприятия
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to={`/event/${this.state.eventData.id}`}>
                                    {this.state.eventData.name}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to={`/editEvent/${this.state.eventData.id}`}>
                                    Редактирование мероприятия
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Конфликты
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="text-center mt-3">
                            <h4>Мероприятие конфликтует с событиями:</h4>
                        </div>
                    </div>
                    <div className="row">
                        {renderEvents}
                    </div>
                </div>
                <div className="row m-5 pb-3">
                    <div className="col-12 col-md-6 m-3 m-md-0">
                        <Link to={`/editEvent/${this.state.eventData.id}`}>
                            <Button className="col-12 offset-0 col-md-8 offset-md-2 p-2 bg-primary">
                                Вернуться &nbsp;<span className="fa fa-undo fa-lg"></span>
                            </Button>
                        </Link>
                    </div>
                    <div className="col-12 col-md-6 m-3 m-md-0">
                        <Button onClick={this.editEvent} className="col-12 offset-0 col-md-8 offset-md-2 p-2 bg-danger">
                            Сохранить &nbsp;<span className="fa fa-save fa-lg"></span>
                        </Button>
                    </div>
                </div>
                <Modal centered={true} className="me-2 me-sm-auto" isOpen={this.state.isErrorWindowOpen} toggle={this.toggleErrorWindow}>
                    <ModalHeader toggle={this.toggleErrorWindow}>Произошла ошибка</ModalHeader>
                    <ModalBody>
                        <h3>{this.state.errorMessage}</h3>
                        <Col className="mt-5" md={{size:6, offset: 3}}>
                            <Button onClick={this.toggleErrorWindow} className="w-100" type="submit" color="primary">
                                Понятно
                            </Button>
                        </Col>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default EditConflictActivities