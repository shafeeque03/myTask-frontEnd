import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/common/Header";
import Expenses from "./Accounts/Expenses";
import Invoices from "./Accounts/Invoices";
import Payments from "./Accounts/Payments";
import HrDashboard from "./Dashboard/HrDashboard";
import ProjectDashboard from "./Dashboard/ProjectDashboard";
import Attendance from "./Employee/Attendance";
import AttendanceEmployees from "./Employee/AttendanceEmployees";
import Departments from "./Employee/Departments";
import EmployeeProfile from "./Employee/EmployeeProfile";
import Holidays from "./Employee/Holidays";
import LeaveRequest from "./Employee/LeaveRequest";
import Members from "./Employee/Members";
import ClientProfile from "./Our Clients/ClientProfile";
import Clients from "./Our Clients/Clients";
import Salaryslip from "./Payroll/Salaryslip";
import Leaders from "./Projects/Leaders";
import Projects from "./Projects/Projects";
import Tasks from "./Projects/Tasks";
import Timesheet from "./Projects/Timesheet";
import TicketsDetail from "./Tickets/TicketsDetail";
import TicketsView from "./Tickets/TicketsView";
import Alerts from "./UIComponents/Alerts";
import Calendar from "./App/Calendar";
import ManageRoles from "./UMS/ManageRoles";
import ManageUsers from "./UMS/ManageUsers";
import ChatApp from "./App/ChatApp";
import ApexCharts from "./OtherPages/ApexCharts";
import FormsExample from "./OtherPages/FormsExample";
import TablesExample from "./OtherPages/TablesExample";
import ReviewsPage from "./OtherPages/ReviewsPage";
import Icons from "./OtherPages/Icons";
import Widgets from "./OtherPages/Widgets";
import Badges from "./UIComponents/Badges";
import Breadcrumb from "./UIComponents/Breadcrumb";
import Buttons from "./UIComponents/Buttons";
import Cards from "./UIComponents/Cards";
import Carousel from "./UIComponents/Carousel";
import Collapse from "./UIComponents/Collapse";
import Dropdowns from "./UIComponents/Dropdowns";
import ListGroup from "./UIComponents/ListGroup";
import ModalUI from "./UIComponents/ModalUI";
import NavsUI from "./UIComponents/NavsUI";
import NavbarUI from "./UIComponents/NavbarUI";
import PaginationUI from "./UIComponents/PaginationUI";
import PopoversUI from "./UIComponents/PopoversUI";
import ProgressUI from "./UIComponents/ProgressUI";
import Scrollspy from "./UIComponents/Scrollspy";
import SpinnersUI from "./UIComponents/SpinnersUI";
import ToastsUI from "./UIComponents/ToastsUI";
import StaterPage from "./Stater/StaterPage";
import PageHeader1 from "../components/common/PageHeader1";
import Documentation from "./Documentation/Documentation";
import Changelog from "./Changelog/Changelog";
import Help from "./Dashboard/Help";
import UserProtect from "./userPrivate/UserProtect";
import UnAuthorized from "../components/common/UnAuthorized";

function MainIndex(props) {
    const { activekey } = props;
    return (
        <div className="main px-lg-4 px-md-4">
            {activekey !== "/chat-app" ? activekey === "/documentation" ? <PageHeader1 /> : <Header /> : ""}
            <div className="body d-flex py-lg-3 py-md-2">
                
                <Route exact path='/unauthorized' component={UnAuthorized} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/hr-dashboard`} component={HrDashboard} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/project-dashboard`} component={ProjectDashboard} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/projects`} component={Projects} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/tasks`} component={Tasks} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/timesheet`} component={Timesheet} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/leaders`} component={Leaders} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/tickets-view`} component={TicketsView} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/tickets-detail`} component={TicketsDetail} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/clients`} component={Clients} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/client-profile`} component={ClientProfile} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/members`} component={Members} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/members-profile`} component={EmployeeProfile} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/holidays`} component={Holidays} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/attendance-employees`} component={AttendanceEmployees} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/attendance`} component={Attendance} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/leave-request`} component={LeaveRequest} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/department`} component={Departments} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/invoices`} component={Invoices} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/payments`} component={Payments} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/expenses`} component={Expenses} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/employee-salary`} component={Salaryslip} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/calander`} component={Calendar} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/manage-role`} component={ManageRoles} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/manage-user`} component={ManageUsers} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/chat-app`} component={ChatApp} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/apex-charts`} component={ApexCharts} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/forms-example`} component={FormsExample} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/table-example`} component={TablesExample} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/reviews-page`} component={ReviewsPage} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/icons`} component={Icons} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/widgets`} component={Widgets} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-alerts`} component={Alerts} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-badge`} component={Badges} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-breadcrumb`} component={Breadcrumb} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-buttons`} component={Buttons} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-card`} component={Cards} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-carousel`} component={Carousel} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-collapse`} component={Collapse} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-dropdowns`} component={Dropdowns} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-listgroup`} component={ListGroup} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-modalui`} component={ModalUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-navsui`} component={NavsUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-navbarui`} component={NavbarUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-paginationui`} component={PaginationUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-popoversui`} component={PopoversUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-progressui`} component={ProgressUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-Scrollspyui`} component={Scrollspy} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-spinnersui`} component={SpinnersUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/ui-toastsui`} component={ToastsUI} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/stater-page`} component={StaterPage} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/documentation`} component={Documentation} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/changelog`} component={Changelog} />
                <UserProtect exact path={`${process.env.PUBLIC_URL}/help`} component={Help} />
            </div>
        </div>
    );
}

export default MainIndex;
