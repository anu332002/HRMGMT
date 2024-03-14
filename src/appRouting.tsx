import React from 'react';
import { Route } from 'react-router-dom';
import Employee from './pages/employeePage';
import TableData from './pages/dashboard';
import CreateUpdateEmployee from './pages/createUpdateEmployee';
import Login from './pages/login';
import Admin from './layout/admin';

const routing = () => {
    return (
        <>
            <Route path="/" exact component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/admin/create" exact component={CreateUpdateEmployee} />
            <Route path="/admin/edit/:key" exact component={CreateUpdateEmployee} />
            <Route path="/employees" exact component={Employee} />
            <Route path="/dashboard" exact component={TableData} />
            <Route path="/login" exact component={Login} />
        </>
    )
}

export default routing;