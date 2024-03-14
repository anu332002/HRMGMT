import React from 'react';
import { forwardRef } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withTranslation } from "react-i18next";
import { Table } from 'react-bootstrap';

// // import { createStyles } from '@material-ui/core';
// import { DataGrid, ColDef } from '@material-ui/data-grid';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid'
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
import Alert from '@material-ui/lab/Alert';

import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardBody from '../components/Card/CardBody';
import '../langauge/configuration';

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
  
  const columns = [
    { field: 'Key', title: 'Key', hidden: true },
    { field: 'UserName', title: 'User name' },
    { field: 'Email', title: 'Email' }
  ];



const modal = (props) => {
    const { t } = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("modal.title")}
                </Modal.Title>
            </Modal.Header><br />

            <Modal.Body>
                <div>
                    <p>{t("modal.para")}</p>
                    <Multiselect
                        options={props.noTeamMembers}
                        onSelect={props.onSelectColumns}
                        onRemove={props.onRemoveColumns}
                        displayValue="UserName"
                    />
                </div>
                <br />
                {
                    props.members.length > 0
                        ?
                        <div className="container">
                            <div className="row">
                                <Grid container spacing={1}>
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader>
                                            </CardHeader>
                                            <CardBody>
                                                <MaterialTable
                                                    data={props.members}
                                                    columns={columns}
                                                    icons={tableIcons}
                                                    title=""
                                                     />
                                            </CardBody>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3}></Grid>
                                </Grid>
                                {/* <Table responsive striped bordered hover>
                                    <thead className="thead-light">
                                        <tr style={{fontWeight: "bold"}}>
                                            <td hidden={true}>{t("table.key")}</td>
                                            <td>{t("table.userName")}</td>
                                            <td >{t("table.firstName")}</td>
                                            <td>{t("table.lastName")}</td>
                                            <td>{t("table.email")}</td>
                                            <td>{t("table.password")}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.members.map(member => {
                                                return (
                                                    <tr key={member.key}>
                                                        <td hidden={true}>{member.Key}</td>
                                                        <td>{member.UserName}</td>
                                                        <td>{member.FirstName}</td>
                                                        <td>{member.LastName}</td>
                                                        <td>{member.Email}</td>
                                                        <td>{member.Password}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table> */}
                            </div>
                        </div>
                        : <div className="row">{t("modal.noTeamMemberFound")}</div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.click}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default withTranslation()(modal);