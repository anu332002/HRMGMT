import { FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import React, { Component } from 'react';
import * as ReactStrap from "reactstrap";
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withTranslation } from "react-i18next";

import {
    employees as GetEmployees,
    deleteEmployee as DeleteEmployee,
    editEmployee as EditEmployee
} from '../api/employees';
import Modal from '../components/modal';
import { IEmployeeProps } from '../types/propTypes';
import { IEmployeeState } from '../types/stateTypes';
import { IEmployee } from '../api/types';
import { defaultEmployee } from '../api/employees';
import '../assets/styles/main.css';

class EmployeePage extends Component<IEmployeeProps, IEmployeeState> {
    private list: IEmployee[] = [];

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            teamMembers: [],
            selectedEmployee: defaultEmployee,
            path: '',
            key: '',
            showModel: false,
            selectedData: [],
            notTeamMembers: []
        }
    }

    private async getEmployees() {
        const data = await GetEmployees();
        this.list = data;
        this.setState({ employees: this.list });
    }

    componentDidMount() {
        this.getEmployees();
    }

    private async GetTeamMembers(key: any) {
        let data = this.list;
        data = data.filter(member => member.TeamID === key);

        let notAssignedToAnyTeam = this.list.filter(member => member.TeamID === "");
        let notTeamMembers = [];
        if (notAssignedToAnyTeam.length > 0 && notAssignedToAnyTeam !== null) {
            for (let i = 0; i < notAssignedToAnyTeam.length; i++) {
                notTeamMembers.push({ UserName: notAssignedToAnyTeam[i].UserName, Key: key });
            }
        }

        this.setState({
            teamMembers: data,
            showModel: true,
            notTeamMembers: notTeamMembers
        })
    }

    private async DeleteEmployee(cell: any, row: any, rowIndex: number) {
        if (window.confirm("are you sure you want to delete this employee?")) {
            await DeleteEmployee(row.Key);
            let list = this.list;
            this.list = list.filter(emp => emp.Key !== row.Key);
            let teamMemberToRemove = list.filter(emp => emp.TeamID === row.Key);
            if (teamMemberToRemove !== null && teamMemberToRemove.length > 0) {
                for (let i = 0; i < teamMemberToRemove.length; i++) {
                    teamMemberToRemove[i].TeamID = "";
                    EditEmployee(teamMemberToRemove[i].Key, JSON.stringify(teamMemberToRemove[i]));
                }
            }

            this.setState({ employees: this.list });
        }
    }

    modelCloseHandler = () => {
        this.setState({
            showModel: false,
            teamMembers: []
        })
    }

    private buttons(cell: any, row: any, rowIndex: number) {
        return (
            <>
                <ReactStrap.Button className="btn btn-info"
                    onClick={() => this.GetTeamMembers(row.Key)}>
                    <FaEye />
                </ReactStrap.Button>{" "}
                <Link className="btn btn-warning" to={`/admin/edit/${row.Key}`}><FaPencilAlt /></Link>{" "}
                <ReactStrap.Button className="btn btn-danger"
                    onClick={() => this.DeleteEmployee(cell, row, rowIndex)}>
                    <FaTrash />
                </ReactStrap.Button>
            </>
        );
    }

    onSelectColumns = (selectedList, selectedItem) => {
        let data = this.list;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < selectedList.length; j++) {
                if (data[i].UserName === selectedList[j].UserName) {
                    data[i].TeamID = selectedList[j].Key;
                }
            }
        }

        let team = data.filter(emp => emp.TeamID === selectedItem.Key);
        this.setState({
            teamMembers: team
        });

        if (team !== null && team.length > 0) {
            for (let m = 0; m < team.length; m++) {
                EditEmployee(team[m].Key, JSON.stringify(team[m]));
            }
        }
    }

    onRemoveColumns = (selectedList, removedItem) => {
        let data = this.list;
        for (let i = 0; i < data.length; i++) {
            if (data[i].UserName === removedItem.UserName) {
                data[i].TeamID = "";
            }
        }

        let team = data.filter(emp => emp.TeamID === removedItem.Key);
        this.setState({
            teamMembers: team
        });

        if (team !== null && team.length > 0) {
            for (let m = 0; m < team.length; m++) {
                EditEmployee(team[m].Key, JSON.stringify(team[m]));
            }
        }
    }

    render() {
        const { t } = this.props;
        const options = {
            page: 1,
            sizePerPage: 5,
            paginationSize: 2,
            sizePerPageList: [5, 10, 15, 20],
            prePage: t("pagination.prev"),
            nextPage: t("pagination.next"),
            firstPage: t("pagination.first"),
            lastPage: t("pagination.last")
        };

        return (
            <div>
                <BootstrapTable
                    data={this.state.employees}
                    hover={true}
                    search
                    pagination
                    options={options}
                    searchPlaceholder={t("table.search")}
                    ref='table'
                    version='4'
                    tableHeaderClass='my-header-class'
                    tableBodyClass='my-body-class'
                    containerClass='my-container-class'
                    tableContainerClass='my-table-container-class'
                    headerContainerClass='my-header-container-class'
                    bodyContainerClass='my-body-container-class'
                >
                    <TableHeaderColumn dataField='Key' isKey={true} dataSort={true} hidden={true}>{t("table.key")}</TableHeaderColumn>
                    <TableHeaderColumn dataField='UserName' dataSort={true} >{t("table.userName")}</TableHeaderColumn>
                    <TableHeaderColumn dataField='FirstName' dataSort={true}>{t("table.firstName")}</TableHeaderColumn>
                    <TableHeaderColumn dataField='LastName' dataSort={true}>{t("table.lastName")}</TableHeaderColumn>
                    <TableHeaderColumn dataField='Email' dataSort={true}>{t("table.email")}</TableHeaderColumn>
                    <TableHeaderColumn dataField='Password' dataSort={true}>{t("table.password")}</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={this.buttons.bind(this)}><Link className="btn btn-success" to="/admin/create">{t("table.addEmployee")}</Link></TableHeaderColumn>
                </BootstrapTable>
                <Modal
                    noTeamMembers={this.state.notTeamMembers}
                    members={this.state.teamMembers}
                    show={this.state.showModel}
                    click={this.modelCloseHandler}
                    onSelectColumns={this.onSelectColumns}
                    onRemoveColumns={this.onRemoveColumns} />
            </div>
        );
    }

}

export default withTranslation()(EmployeePage);