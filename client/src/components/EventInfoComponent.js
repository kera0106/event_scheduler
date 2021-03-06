import React, {Component, Fragment} from "react";
import {Button, Table} from "reactstrap";
import {getEventData, getRole} from "../redux/ActionCreators";
import {connect} from "react-redux";
import {Loading} from "./LoadingComponent";
import {BreadcrumbPanel} from "./BreadcrumbPanelComponent";
import * as UserRoles from "./userRoles/UserRoles";

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

const mapStateToProps = state => {
    return {
        eventData: state.eventData,
        role: state.role
    }
}

const mapDispatchToProps = dispatch => ({
    getEventData: () => { dispatch(getEventData()) },
    getRole: () => { dispatch(getRole()) }
});

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

const RenderActivitiesBlock = ({activities}) => {
    if (activities.length === 0){
        return(
            <div className="col-12 col-md-7 mt-5 mt-md-3 offset-md-1">
                <h3>Нет событий</h3>
            </div>
        )
    }
    else {
        return(
            <div className="col-12 col-md-8">
                <h4 className="offset-1 mt-3 mt-md-0">События:</h4>
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
                        <RenderActivity activities={activities}/>
                    </tbody>
                </Table>
            </div>
        )
    }

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

const ButtonPanelForBigScreen = ({role, edit}) => {
    if (role === UserRoles.AUTHOR){
        return(
            <div className="mt-4 d-none d-md-block">
                <Button className="bg-danger col-10 mt-2 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
                <Button className="bg-primary col-10 mt-2 mb-2" onClick={edit}>Редактировать &nbsp;<span className="fa fa-edit fa-lg"></span></Button>
                <Button className="bg-success col-10 mt-2 mb-2">Поделиться &nbsp;<span className="fa fa-share fa-lg"></span></Button>
                <Button className="bg-success col-10 mt-2 mb-2">Назначить роль &nbsp;<span className="fa fa-user-circle fa-lg"></span></Button>
            </div>
        )
    }

    else if (role === UserRoles.WRITER){
        return(
            <div className="mt-4 d-none d-md-block">
                <Button className="bg-danger col-10 mt-2 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
                <Button className="bg-primary col-10 mt-2 mb-2" onClick={edit}>Редактировать &nbsp;<span className="fa fa-edit fa-lg"></span></Button>
            </div>
        )
    }

    else if (role === UserRoles.MANAGER){
        return(
            <div className="mt-4 d-none d-md-block">
                <Button className="bg-danger col-10 mt-2 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
                <Button className="bg-success col-10 mt-2 mb-2">Поделиться &nbsp;<span className="fa fa-share fa-lg"></span></Button>
            </div>
        )
    }

    else {
        return(
            <div className="mt-4 d-none d-md-block">
                <Button className="bg-danger col-10 mt-2 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
            </div>
        )
    }
}

const ButtonPanelForSmallScreen = ({role, edit}) => {
    if (role === UserRoles.AUTHOR){
        return(
            <div className="mt-4 d-md-none mb-5">
                <Button className="bg-danger col-12 mt-3 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
                <Button className="bg-primary col-12 mt-3 mb-2" onClick={edit}>Редактировать &nbsp;<span className="fa fa-edit fa-lg"></span></Button>
                <Button className="bg-success col-12 mt-3 mb-2">Поделиться &nbsp;<span className="fa fa-share fa-lg"></span></Button>
                <Button className="bg-success col-12 mt-2 mb-2">Назначить роль &nbsp;<span className="fa fa-user-circle fa-lg"></span></Button>
            </div>
        )
    }

    else if (role === UserRoles.WRITER){
        return(
            <div className="mt-4 d-md-none mb-5">
                <Button className="bg-danger col-12 mt-3 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
                <Button className="bg-primary col-12 mt-3 mb-2" onClick={edit}>Редактировать &nbsp;<span className="fa fa-edit fa-lg"></span></Button>
            </div>
        )
    }

    else if (role === UserRoles.MANAGER){
        return(
            <div className="mt-4 d-md-none mb-5">
                <Button className="bg-danger col-12 mt-3 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
                <Button className="bg-success col-12 mt-3 mb-2">Поделиться &nbsp;<span className="fa fa-share fa-lg"></span></Button>
            </div>
        )
    }

    else {
        return(
            <div className="mt-4 d-md-none mb-5">
                <Button className="bg-danger col-12 mt-3 mb-2">Отписаться &nbsp;<span className="fa fa-calendar-times-o fa-lg"></span></Button>
            </div>
        )
    }
}

class EventInfo extends Component{

    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this)
    }

    componentDidMount() {
        this.props.getEventData();
        this.props.getRole();
    }

    edit() {
        sessionStorage.setItem('editEventData', JSON.stringify(this.props.eventData.data))
        window.location = `/editEvent/${this.props.eventData.data.id}`
    }

    render() {
        if (this.props.eventData.isLoading){
            return(
                <div>
                    <BreadcrumbPanel location={'Загрузка'}/>
                    <div className="container">
                        <div className="mt-5 ms-5">
                            <Loading loadingObject={"событий"}/>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.props.eventData.errMess){
            return(
                <div>
                    <BreadcrumbPanel location={'Ошибка'}/>
                    <div className="container">
                        <div className="mt-5">
                            <h3>Произошла ошибка: {this.props.eventData.errMess}</h3>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <BreadcrumbPanel location={this.props.eventData.data.name}/>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <h3> {this.props.eventData.data.name}</h3>
                                <h6 className="mt-4"> {this.props.eventData.data.description}</h6>
                                <ButtonPanelForBigScreen role={this.props.eventData.role} edit={this.edit}/>
                            </div>
                            <RenderActivitiesBlock activities={this.props.eventData.data.activities}/>
                            <ButtonPanelForSmallScreen role={this.props.eventData.role} edit={this.edit}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo)
