import React from 'react';
import i18next from 'i18next';
import withStyles from '@material-ui/core/styles/withStyles';
import { MdExitToApp, MdTrackChanges, MdFlare } from "react-icons/md";
import {logoutUser } from '../../context/loginContext';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody
} from "reactstrap";

import headerLinksStyle from '../../assets/jss/material-dashboard-react/components/headerLinksStyle';
import '../../assets/styles/main.css';
import { setLocalStorage } from '../../store/localStorage';

interface Props {
  classes: any;
  location: any;
}

class HeaderLinks extends React.Component<Props, {}> {
  anchorEl: any;
  state = {
    open: false,
    isOpenChangeLang: false
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  handleClose = (event: any) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  }

  logoutHandler = () => {
    logoutUser();
  }

  toggleChangeLangPopover = () => {
    this.setState({
      isOpenChangeLang: !this.state.isOpenChangeLang
    });
  }

  languageChangeHandler = (value: any) => {
    i18next.changeLanguage(value);
    setLocalStorage("language", value);
    this.setState({
      isOpenChangeLang: false
    });
  }

  render() {
    return (
      <Navbar light expand>
        <Nav>
          <NavItem>
            <NavLink id="Popover3">
              <Button>Lang</Button>
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenChangeLang}
              toggle={this.toggleChangeLangPopover}
              target="Popover3"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <ListGroup flush>
                  <ListGroupItem tag="button" action className="border-light" onClick={() => this.languageChangeHandler('en')}>
                    <MdTrackChanges /> English
                  </ListGroupItem>
                  <ListGroupItem tag="button" action className="border-light" onClick={() => this.languageChangeHandler('es')}>
                    <MdFlare /> Spanish
                  </ListGroupItem>
                </ListGroup>
              </PopoverBody>
            </Popover>
          </NavItem>
          <NavItem>
            <PopoverBody className="p-0 border-light">
              <ListGroup flush>
                <ListGroupItem tag="button" action className="border-light" onClick={this.logoutHandler}>
                  <MdExitToApp /> Signout
                  </ListGroupItem>
              </ListGroup>
            </PopoverBody>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
