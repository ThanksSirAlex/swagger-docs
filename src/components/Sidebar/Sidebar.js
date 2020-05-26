/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
    const classes = useStyles();

    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    const {color, image, logoText, routes} = props;
    var links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                var activePro = " ";
                var listItemClasses;

                listItemClasses = classNames({
                    [" " + classes[color]]: activeRoute(prop.path)
                });
                const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: activeRoute(prop.path)
                });
                return (
                    <NavLink
                        to={prop.path}
                        className={activePro + classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem button className={classes.itemLink + listItemClasses}>
                            <ListItemText
                                primary={props.rtlActive ? prop.rtlName : prop.name}
                                className={classNames(classes.itemText, whiteFontClasses, {
                                    [classes.itemTextRTL]: props.rtlActive
                                })}
                                disableTypography={true}
                            />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );
    var brand = (
        <div className={classes.logo}>
            <p
                className={classNames(classes.logoLink, {
                    [classes.logoLinkRTL]: props.rtlActive
                })}
            >
                {logoText}
            </p>
        </div>
    );
    return (
        <div>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classNames(classes.drawerPaper, {
                            [classes.drawerPaperRTL]: props.rtlActive
                        })
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>{links}</div>
                    {image !== undefined ? (
                        <div
                            className={classes.background}
                            style={{backgroundImage: "url(" + image + ")"}}
                        />
                    ) : null}
                </Drawer>
            </Hidden>
        </div>
    );
}

Sidebar.propTypes = {
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};
