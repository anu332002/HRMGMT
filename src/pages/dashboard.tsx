import Grid from '@material-ui/core/Grid';
import { FaEye } from "react-icons/fa";
import React, { useState, useEffect, Component } from 'react';
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardBody from '../components/Card/CardBody';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import { forwardRef } from 'react';
import { withTranslation } from 'react-i18next';
import IconButton from "@material-ui/core/IconButton";

import Modal from '../components/modal';
import {
  editEmployee as EditEmployee,
  deleteEmployee as DeleteEmployee,
  addEmployee as AddEmployee
} from '../api/employees';
import { env } from '../environments/environment';
import { TFunction } from 'i18next';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



function changeTeam(Key: any, data: any) {
  let list = data;
  list = list.filter(member => member.TeamID === Key);

  let notAssignedToAnyTeam = data.filter(member => member.TeamID === "");
  let notTeamMembers = [];
  if (notAssignedToAnyTeam.length > 0 && notAssignedToAnyTeam !== null) {
    for (let i = 0; i < notAssignedToAnyTeam.length; i++) {
      notTeamMembers.push({ UserName: notAssignedToAnyTeam[i].UserName, Key: Key });
    }
  }
  team = list;
  console.log(team);
  // let data = this.list;
  // data = data.filter(member => member.TeamID === Key);

  // let notAssignedToAnyTeam = this.list.filter(member => member.TeamID === "");
  // let notTeamMembers = [];
  // if (notAssignedToAnyTeam.length > 0 && notAssignedToAnyTeam !== null) {
  //     for (let i = 0; i < notAssignedToAnyTeam.length; i++) {
  //         notTeamMembers.push({ UserName: notAssignedToAnyTeam[i].UserName, Key: key });
  //     }
  // }

  // this.setState({
  //     teamMembers: data,
  //     showModel: true,
  //     notTeamMembers: notTeamMembers
  // })
}

interface Props {
  t: TFunction;
}

const team = [];
const re = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;

class TableList extends Component<Props, {}> {
  // const [t, i18n] = useTranslation();

  constructor(props) {
    super(props)
    const { t } = this.props;
    this.state = {
      data: [],
      iserror: false,
      showModel: false,
      errorMessages: [],
      teamMembers: [],
      notTeamMembers: [],
      columns: [
        { field: 'Key', title: 'Key', hidden: true },
        { field: 'FirstName', title: t("table.firstName") },
        { field: 'LastName', title: t("table.lastName") },
        { field: 'UserName', title: t("table.userName") },
        { field: 'Email', title: t("table.email") },
        { field: 'Password', title: t("table.password") },
        {
          field: '', title: '', render: (rowData) =>
            rowData && (
              <IconButton onClick={() => this.GetTeamMembers(rowData.Key)}>
                <FaEye />
          </IconButton>
            )
        }
      ]
    }
    // const columns = [
    //   { field: 'Key', title: 'Key', hidden: true },
    //   { field: 'FirstName', title: t("table.firstName") },
    //   { field: 'LastName', title: t("table.lastName") },
    //   { field: 'UserName', title: t("table.userName") },
    //   { field: 'Email', title: t("table.email") },
    //   { field: 'Password', title: t("table.password") },
    //   {
    //     field: '', title: '', render: (rowData) =>
    //       rowData && (
    //         <IconButton onClick={() => changeTeam(rowData.Key, data)}>
    //           show
    //     </IconButton>
    //       )
    //   }
    // ];
  }


  // const { classes } = props;
  // const [data, setData] = useState([]);
  // const [iserror, setIserror] = useState(false);
  // const [open, setOpenModel] = useState(false);
  // if(team !== null && team.length > 0){
  //   setOpenModel(true);
  // }
  // const [errorMessages, setErrorMessages] = useState([]);


  componentDidMount() {
    axios.get(env.BASE_API + 'employees.json')
      .then(res => {
        const employees = Object.keys(res.data)
        const list = employees.map(key => {
          const emp = res.data[key]
          return {
            Key: key,
            FirstName: emp.FirstName,
            UserName: emp.UserName,
            Email: emp.Email,
            Password: emp.Password,
            LastName: emp.LastName,
            TeamID: emp.TeamID,
          }
        });
        this.setState({ data: list });
      })
  }
  // useEffect(() => {
  //   axios.get(env.BASE_API + 'employees.json')
  //     .then(res => {
  //       const employees = Object.keys(res.data)
  //       const list = employees.map(key => {
  //         const emp = res.data[key]
  //         return {
  //           Key: key,
  //           FirstName: emp.FirstName,
  //           UserName: emp.UserName,
  //           Email: emp.Email,
  //           Password: emp.Password,
  //           LastName: emp.LastName,
  //           TeamID: emp.TeamID,
  //         }
  //       });
  //       setData(list);
  //     })
  // }, [])

  modelCloseHandler = () => {
    this.setState({
      showModel: false,
      teamMembers: []
    })
  }

  private async GetTeamMembers(key: any) {
    let data = this.state.data;
    data = data.filter(member => member.TeamID === key);

    let notAssignedToAnyTeam = this.state.data.filter(member => member.TeamID === "");
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

  onSelectColumns = (selectedList, selectedItem) => {
    let data = this.state.data;
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
    let data = this.state.data;
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

  handleRowUpdate = (newData, oldData, resolve) => {
    const { t } = this.props;
    //validation
    let errorList = []
    if (newData.FirstName === undefined) {
      errorList.push(t("table.firstName") + t("validation.isRequired"))
    }
    if (newData.LastName === undefined) {
      errorList.push(t("table.lastName") + t("validation.isRequired"))
    }
    if (newData.Email === undefined) {
      errorList.push(t("table.email") + t("validation.isRequired"))
    }
    if (newData.Email !== undefined && re.test(String(newData.Email).toLowerCase()) === false) {
      errorList.push(t("validation.validEmail"))
    }
    if (newData.UserName === undefined) {
      errorList.push(t("table.userName") + t("validation.isRequired"))
    }
    if (newData.Password === undefined) {
      errorList.push(t("table.password") + t("validation.isRequired"))
    }
    if (newData.Password !== undefined && newData.Password.length < 8) {
      errorList.push(t("validation.passwordLength"))
    }
    if (errorList.length < 1) {
      EditEmployee(newData.Key, newData);
      const dataUpdate = [...this.state.data];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      this.setState({
        data: dataUpdate,
        iserror: false,
        errorMessages: []
      });
      // setData([...dataUpdate]);
      resolve()
      // setIserror(false)
      // setErrorMessages([])
    } else {
      this.setState({
        iserror: true,
        errorMessages: errorList
      });
      // setErrorMessages(errorList)
      // setIserror(true)
      resolve()
    }
  }

  handleRowAdd = (newData, resolve) => {
    const { t } = this.props;
    //validation
    let errorList = []
    if (newData.FirstName === undefined) {
      errorList.push(t("table.firstName") + t("validation.isRequired"))
    }
    if (newData.LastName === undefined) {
      errorList.push(t("table.lastName") + t("validation.isRequired"))
    }
    if (newData.Email === undefined) {
      errorList.push(t("table.email") + t("validation.isRequired"))
    }
    if (newData.Email !== undefined && re.test(String(newData.Email).toLowerCase()) === false) {
      errorList.push(t("validation.validEmail"))
    }
    if (newData.UserName === undefined) {
      errorList.push(t("table.userName") + t("validation.isRequired"))
    }
    if (newData.Password === undefined) {
      errorList.push(t("table.password") + t("validation.isRequired"))
    }
    if (newData.Password !== undefined && newData.Password.length < 8) {
      errorList.push(t("validation.passwordLength"))
    }
    if (errorList.length < 1) {
      AddEmployee(newData);
      let dataToAdd = [...this.state.data];
      dataToAdd.push(newData);
      this.setState({
        data: dataToAdd,
        iserror: false,
        errorMessages: []
      });
      // setData(dataToAdd);
      resolve()
      // setErrorMessages([])
      // setIserror(false)
    } else {
      this.setState({
        iserror: true,
        errorMessages: errorList
      });
      // setErrorMessages(errorList)
      // setIserror(true)
      resolve()
    }
  }

  handleRowDelete = (oldData, resolve) => {
    DeleteEmployee(oldData.Key);
    const dataDelete = [...this.state.data];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    this.setState({ data: dataDelete });
    // setData([...dataDelete]);
    resolve()
  }
  render() {
    const { t } = this.props;
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={12}>
            <div>
              {this.state.iserror &&
                <Alert severity="error">
                  {this.state.errorMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>
                  })}
                </Alert>
              }
            </div>
            <Card>
              <CardHeader color="primary">
                <h4>{t("dashboard.EmployeeManagement")}</h4>
              </CardHeader>
              <CardBody>
                <MaterialTable
                  data={this.state.data}
                  columns={this.state.columns}
                  icons={tableIcons}
                  title=""
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        this.handleRowUpdate(newData, oldData, resolve);
                      }),
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        this.handleRowAdd(newData, resolve)
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve) => {
                        this.handleRowDelete(oldData, resolve)
                      }),
                  }} />
              </CardBody>
            </Card>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Modal
          noTeamMembers={this.state.notTeamMembers}
          members={this.state.teamMembers}
          show={this.state.showModel}
          click={this.modelCloseHandler}
          onSelectColumns={this.onSelectColumns}
          onRemoveColumns={this.onRemoveColumns} />
      </>
    );
  }

}

export default withTranslation()(TableList);
