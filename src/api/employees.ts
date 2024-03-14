import { IEmployee } from './types';
import request from '../utils/request'

export const defaultEmployee: IEmployee = {
    Key: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    TeamID: ''
}

export const employees = () =>
    request({
        url: '/employees.json',
        method: 'get'
    }).then(response => {
        const employees = Object.keys(response.data)
        return employees.map(key => {
            const employee = response.data[key]
            return {
                Key: key,
                FirstName: employee.FirstName,
                UserName: employee.UserName,
                Email: employee.Email,
                Password: employee.Password,
                LastName: employee.LastName,
                TeamID: employee.TeamID
            }
        });
    })

export const getEmployee = (key: any) => 
    request({
        url: '/employees/' + key + '.json',
        method: 'get'
    }).then(res => {
        return {
            Key: key,
            Password: res.data.Password,
            UserName: res.data.UserName,
            FirstName: res.data.FirstName,
            LastName: res.data.LastName,
            Email: res.data.Email,
            TeamID: res.data.TeamID
        }
    });


export const deleteEmployee = (key: any) => {
    request({
        url: '/employees/' + key + '.json',
        method: 'delete'
    }).then(res => console.log(res));
}

export const editEmployee = (key: any, data: any) => {
    request({
        url: '/employees/' + key + '.json',
        method: 'put',
        data
    }).then(res => console.log(res));
}

export const addEmployee = (data: any) => {
    request({
        url: '/employees.json',
        method: 'post',
        data
    }).then(res => console.log(res));
}