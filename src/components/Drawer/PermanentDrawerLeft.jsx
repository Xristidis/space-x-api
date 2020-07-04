import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import { red } from '@material-ui/core/colors';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Rocket from '../../rocket.png'

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_ROCKET_INFO = gql`
{
  rockets {
    name
    height {
      meters
    }
    cost_per_launch
    country
    active
    description
    diameter {
      feet
      meters
    }
    id
  }
}`

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: '0d3d61',
        padding: theme.spacing(3),
    },
    welcome: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ryan: {
        color: '#2196F3',
    },
    rocket: {
        margin: '0 15px 0 0',
    },
    dividerColor: {
        backgroundColor: '#2196F3',
    }
}));

export default function PermanentDrawerLeft() {

    const { data, loading, error } = useQuery(GET_ROCKET_INFO);

    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    console.log(data.rockets);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
                <Divider variant="middle" className={classes.dividerColor} />
                <Tabs
                    value={value}
                    indicatorColor="white"
                    textColor="white"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Rockets" />
                    <Tab label="Satelites" />
                </Tabs>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.welcome}>
                    <img src={Rocket} className={classes.rocket}></img>
                    <p className={`${classes.toolbar} ${classes.welcome}`}>Welcome,&nbsp;<span className={classes.ryan}>Ryan</span></p>
                </div>

                <Divider />
                <List>
                    {['Dashboard', 'Profile', 'Subscription'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <PeopleIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                </Typography>
            </main>
            <h1>ACTIVE ROCKETS</h1>
            <div className="container">
                {data.rockets.map((rocket, id) => (
                    <div key={id} className="card">
                        {/* <img src={rocket.image} /> */}
                        <div class="card-body">
                            <h3>{rocket.name}</h3>
                            <h3>${rocket.cost_per_launch}</h3>
                            <h3>{rocket.country}</h3>
                            <h3>{rocket.description}</h3>

                            <p>
                                {rocket.evolutions && rocket.evolutions.length !== 0 && (
                                    <p>
                                        {" "}
                    Evolutions:
                                        {rocket.evolutions.map((e, indx) => {
                                            return <p key={indx}> {e.name} </p>;
                                        })}
                                    </p>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}
