import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { SCALE_ITEMS, setVote } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '10px 5px',
        },
        voteCard: {
            '&::before': {
                display: 'block',
                content: '""',
                paddingTop: '115%',
            },
            flex: 1,
            margin: 5,
            padding: 0,
            fontSize: 24,
            '& svg': {
                height: '80%',
                width: '80%',
            },
        },
        selected: {
            borderColor: theme.palette.warning.main,
            color: theme.palette.warning.main,
        },
    })
)

function VoteCards(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const scale = useSelector((state) => state.settings.scale)
    const closeOnVote = useSelector((state) => state.settings.closeOnVote)
    const vote = useSelector((state) => state.vote.selected)

    const { handleDrawerToggle = () => { } } = props

    const handleToggleVote = (idx) => {
        if (closeOnVote && history.location.pathname === '/results') {
            handleDrawerToggle()
        }
        dispatch(setVote(idx === vote ? null : idx))
    }

    return <div className={classes.root}>
        {SCALE_ITEMS[scale].map((text, idx) => (
            <Button key={text} variant="outlined" onClick={() => handleToggleVote(idx)}
                className={clsx(classes.voteCard, {
                    [classes.selected]: vote === idx,
                })}
            >
                {text}
            </Button>
        ))}
    </div>
}

export default VoteCards
