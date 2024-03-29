import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import withStyles from '@material-ui/core/styles/withStyles';
import Navbar from '../components/Navbars/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { withTranslation } from "react-i18next";

import routes from '../routes';

import dashboardStyle from '../assets/jss/material-dashboard-react/layouts/dashboardStyle';

import image from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

import { TFunction } from 'i18next';

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.layout === '/admin') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
        })}
    </Switch>
);

interface Props {
    classes: any;
    location: any;
    t: TFunction;
}

interface State {
    image: string;
    color: string;
    hasImage: boolean;
    fixedClasses: string;
    mobileOpen: boolean;
}

class Dashboard extends React.Component<Props, State> {
    refs: any;
    constructor(props: Props) {
        super(props);
        this.state = {
            image: image,
            color: 'blue',
            hasImage: true,
            fixedClasses: 'dropdown show',
            mobileOpen: false
        };
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    }

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }

    componentDidMount() {
        if (navigator.platform.indexOf('Win') > -1) {
            const ps = new PerfectScrollbar(this.refs.mainPanel);
        }
        window.addEventListener('resize', this.resizeFunction);
    }

    componentDidUpdate(e: any) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeFunction);
    }

    render() {
        const { classes, ...rest } = this.props;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={routes}
                    logoText={rest.t("CreativeTim")}
                    logo={logo}
                    image={this.state.image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color={this.state.color}
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Navbar
                        routes={routes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(dashboardStyle)(withTranslation()(Dashboard));
