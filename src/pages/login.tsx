import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Fade,
  Paper,
  AppBar,
  Toolbar,
} from "@material-ui/core";

import useStyles from "../assets/loginStyle";

import { loginUser } from "../context/loginContext";

function Login(props) {
  let classes = useStyles();

  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [userNameValue, setUserNameValue] = useState("tatva@gmail.com");
  let [passwordValue, setPasswordValue] = useState("tatva123@");

  return (
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className={classes.loginForm}
          >
            <Paper
              variant="elevation"
              elevation={2}
              className={classes.loginBackground}
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Fade in={error}>
                  <Typography
                    color="secondary"
                    className={classes.errorMessage}
                  >
                    Invalid username or password
                  </Typography>
                </Fade>
              </Grid>
              <Grid item>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <TextField
                      id="email"
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      value={userNameValue}
                      onChange={(e) => setUserNameValue(e.target.value)}
                      margin="normal"
                      label="Email Address"
                      placeholder="Email Adress"
                      type="email"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                      autoFocus
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="password"
                      InputProps={{
                        classes: {
                          underline: classes.textFieldUnderline,
                          input: classes.textField,
                        },
                      }}
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      margin="normal"
                      placeholder="Password"
                      type="password"
                      fullWidth
                      required
                      variant="outlined"
                      margin="normal"
                      label="Password"
                    />
                  </Grid>
                  <Grid item>
                    <div className={classes.formButtons}>
                      {isLoading ? (
                        <CircularProgress
                          size={26}
                          className={classes.loginLoader}
                        />
                      ) : (
                        <Button
                          disabled={
                            userNameValue.length === 0 ||
                            passwordValue.length === 0
                          }
                          onClick={() =>
                            loginUser(
                              userNameValue,
                              passwordValue,
                              props.history,
                              setIsLoading,
                              setError
                            )
                          }
                          variant="contained"
                          color="primary"
                          size="large"
                        >
                         Sign in
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default Login;