import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles, Button } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { SCALE_ITEMS } from '../actions/settings'

const useStyles = makeStyles((theme) => createStyles({
        root: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '100vw',
        },
        card: {
            minWidth: '3.6ex',
            backgroundColor: theme.palette.background.default,
            borderWidth: 2,
            fontSize: '45vw',
            [theme.breakpoints.up('sm')]: {
                fontSize: '30vw',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '20vw',
            },
            [theme.breakpoints.up('lg')]: {
                fontSize: '15vw',
            },
            padding: 0,
            transformStyle: 'preserve-3d',
            transform: 'rotateY(.5turn)',
            transition: 'transform 1s',
            '& span.MuiButton-label svg': {
                width: '80%',
                height: '80%',
            },
            '&:hover': {
                backgroundColor: theme.palette.background.default,
            },
            '&:before': {
                content: '""',
                display: 'table',
                paddingTop: '120%',
            },
            '&:after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                width: '99%',
                height: '99%',
                transform: 'rotateY(.5turn)',
                backgroundColor: theme.palette.background.default,
                backgroundImage: `
                    repeating-linear-gradient(-45deg, transparent, transparent 5px, ${theme.palette.action.selected} 6px, transparent 7px),
                    repeating-linear-gradient(45deg, transparent, transparent 5px,  ${theme.palette.action.selected} 6px, transparent 7px)
                `,
                backfaceVisibility: 'hidden',
            }
        },
        'visible': {
            transform: 'rotateY(0turn)',
        }
    })
)

function VoteResults() {
    const classes = useStyles()
    const [visible, setVisible] = useState(false)

    const scale = useSelector(({settings}) => settings.scale)
    const vote = useSelector(({ vote }) => vote.selected)

    const handleToggleVisible = () => setVisible(!visible)

    useEffect(() => {
        setVisible(false)
    }, [vote])

    return <div className={classes.root}>
        { vote !== null ? <Button
        onClick={handleToggleVisible}
        className={clsx(classes.card, {
            [classes.visible]: visible,
        })} variant="outlined">{SCALE_ITEMS[scale][vote]}</Button> : null}
    </div>
}

export default VoteResults
