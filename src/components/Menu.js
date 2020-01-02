import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PlayArrow from '@material-ui/icons/PlayArrowRounded'
import Pause from '@material-ui/icons/PauseRounded'
import DarkThemeIcon from '@material-ui/icons/Brightness4'
import LightThemeIcon from '@material-ui/icons/Brightness7'
import SettingsIcon from '@material-ui/icons/TuneRounded'
import VoteCards from './VoteCards'
import { useDispatch } from 'react-redux'
import { toggleSettings } from '../actions'
import { useHistory } from 'react-router-dom'

const drawerWidth = 320

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flex: 1,
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: '100%',
            maxWidth: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: '100%',
            maxWidth: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        drawerHeaderActions: {
            flex: 1,
        },
        content: {
            flexGrow: 1,
            display: 'flex',
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
    }),
)

export default function PersistentDrawerLeft({ togglePalleteMode, children }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const handleSettingsToggle = (e) => {
        dispatch(toggleSettings(true))
    }

    const handleTouchStart = ({ nativeEvent: e }) => {
        const startX = e.touches[0].clientX

        const handleSwipe = (evt) => {
            const swipeLength = evt.changedTouches[0].clientX - startX
            if (!open && swipeLength > 150) {
                setOpen(true)
            } else if (open && swipeLength < -150) {
                setOpen(false)
            }
            e.target.removeEventListener('touchend', handleSwipe)
        }
        if ((!open && startX < 50) || (open && startX < 300)) {
            e.target.addEventListener('touchend', handleSwipe)
        }
    }

    return (
        <div className={classes.root} onTouchStart={handleTouchStart}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Agiled
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <div className={classes.drawerHeaderActions}>
                        <IconButton onClick={togglePalleteMode}>
                            {theme.palette.type === 'dark' ? <LightThemeIcon /> : <DarkThemeIcon />}
                        </IconButton>
                        <IconButton onClick={handleSettingsToggle}>
                            <SettingsIcon />
                        </IconButton>
                    </div>
                    <IconButton onClick={handleDrawerToggle}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {[{
                        icon: <PlayArrow />,
                        path: '/results',
                        title: 'Start vote',
                    }].map((item) => (
                        history.location.pathname) !== '/results' ?
                        <ListItem button key={item.title} onClick={() => history.push(item.path)}>
                            <ListItemIcon><PlayArrow /></ListItemIcon>
                            <ListItemText primary={'Start vote'} />
                        </ListItem>
                        :
                        <ListItem button key="Stop vote" onClick={() => history.push('/')}>
                            <ListItemIcon><Pause /></ListItemIcon>
                            <ListItemText primary={'Stop vote'} />
                        </ListItem>
                    )}
                </List>
                <Divider />
                <VoteCards handleDrawerToggle={handleDrawerToggle} />
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {children}
            </main>
        </div>
    )
}
