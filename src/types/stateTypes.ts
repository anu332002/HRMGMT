import { IEmployee } from "../api/types";

export interface IEmployeeState {
    employees: IEmployee[];
    teamMembers: IEmployee[];
    selectedEmployee: IEmployee;
    key: any;
    path: any;
    showModel: boolean;
    selectedData: any;
    notTeamMembers: any;
}