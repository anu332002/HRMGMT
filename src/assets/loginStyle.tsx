import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  loginForm:{
    justifyContent: "center",
    minHeight: "90vh"
  },
  buttonBlock:{
    width: "100%"
  },
  loginBackground:{
    justifyContent: "center",
    minHeight: "30vh",
    padding: "50px"
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  errorMessage: {
    textAlign: "center",
    color: "red"
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: "#4791db",
    },
    "&:after": {
      borderBottomColor: "#1976d2",
    },
    "&:hover:before": {
      borderBottomColor: "#4791db !important",
    },
  },
  textField: {
    borderBottomColor: "#4791db",
  },
  formButtons: {
    width: "100%",
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: 8,
  }
});
export default styles;