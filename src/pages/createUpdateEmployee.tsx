import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { IEmployeeState } from '../types/stateTypes';
import {
    defaultEmployee,
    getEmployee as GetEmployee,
    editEmployee as EditEmployee,
    addEmployee as AddEmployee
} from '../api/employees';
import { IEmployeeProps } from '../types/propTypes';
import { IEmployee } from '../api/types';
import { Link } from 'react-router-dom';

import { withTranslation } from "react-i18next";
import '../langauge/configuration';
import Validation from '../validations/validationSchema';
import '../assets/styles/main.css';

let employee: IEmployee = defaultEmployee;

class SaveEmployee extends Component<IEmployeeProps, IEmployeeState>{
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            selectedEmployee: defaultEmployee,
            key: props.match.params.key,
            path: props.match.path,
            showModel: false,
            selectedData: [],
            notTeamMembers: [],
            teamMembers: []
        }
    }

    componentDidMount() {
        if (this.state.key !== undefined && this.state.key !== null) {
            this.getEmployee(this.state.key);
        }
    }

    private async getEmployee(key: any) {
        const emp = await GetEmployee(key);
        employee = emp;
        this.setState({ selectedEmployee: employee });
    }

    render() {
        const { t } = this.props;
        let emp = this.state.selectedEmployee;
        return (
            <Formik
                initialValues={{
                    userName: emp.UserName,
                    firstName: emp.FirstName,
                    lastName: emp.LastName,
                    email: emp.Email,
                    password: emp.Password
                }}
                enableReinitialize
                validationSchema={Validation}
                onSubmit={fields => {
                    employee.UserName = fields.userName;
                    employee.FirstName = fields.firstName;
                    employee.LastName = fields.lastName;
                    employee.Email = fields.email;
                    employee.Password = fields.password;
                    employee.TeamID = "";
                    const emp = JSON.stringify(employee);
                    if (this.state.path === "/edit/:key") {
                        EditEmployee(this.state.key, emp);
                        this.props.history.push("/admin/dashboard");
                    }
                    else {
                        AddEmployee(emp);
                        this.props.history.push("/admin/dashboard");
                    }
                }}
                render={({ errors, status, touched }) => (
                    <div className="createEdit">
                        <h5>{this.state.path === "/edit/:key" ? t("modal.updateEmp") : t("modal.newEmp")}</h5>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="userName" className="displayLabel">{t("table.userName")}</label>
                                <Field name="userName" type="text" className={'displayField' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                                <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName" className="displayLabel">{t("table.firstName")}</label>
                                <Field name="firstName" type="text" className={'displayField' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="displayLabel">{t("table.lastName")}</label>
                                <Field name="lastName" type="text" className={'displayField' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="displayLabel">{t("table.email")}</label>
                                <Field name="email" type="email" className={'displayField' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="displayLabel">{t("table.password")}</label>
                                <Field name="password" type="password" className={'displayField' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btnSave">{t("form.save")}</button>{"   "}
                                <Link to="/admin/dashboard" className="btnCancel">{t("form.cancel")}</Link>
                            </div>
                        </Form>
                    </div>
                )}
            />
        )
    }

}

export default withTranslation()(SaveEmployee);