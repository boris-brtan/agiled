import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Typography, Button, createStyles, makeStyles, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import alarmSound from '../sounds/alarm.mp3'
import tickSound from '../sounds/tick.mp3'
import { useSelector } from 'react-redux'

const alarm = new Audio(alarmSound)
const tick = new Audio(tickSound)
alarm.load()
tick.load()

const useStyles = makeStyles((theme) =>
    createStyles({
        'countdown': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
            transition: theme.transitions.create(['background-color'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.complex,
            }),
        },
        'counter': {
            fontSize: '20vw',
            position: 'relative',
            '&:after': {
                backgroundColor: 'transparent',
                content: '""',
                display: 'block',
                width: '104%',
                left: '-2%',
                height: '2vw',
                transform: 'rotate(-10deg)',
                position: 'absolute',
                top: '50%',
                '.error&': {
                    backgroundColor: theme.palette.background.default,
                    '$light &': {
                        backgroundColor: theme.palette.error.main,
                    },
                },
            },
        },
        'button': {
            fontSize: 30,
            textTransform: 'none',
            padding: '7px 25px',
            minWidth: 150,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            transition: theme.transitions.create(['background'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.complex,
            }),
            '&:hover': {
                backgroundImage: `linear-gradient(to right, ${theme.palette.action.hover}, ${theme.palette.action.hover})`,
                backgroundColor: theme.palette.secondary.main,
                '$warning&': {
                    backgroundColor: theme.palette.warning.main,
                },
                '$error&': {
                    backgroundColor: theme.palette.error.main,
                },
            },
        },
        'light': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
        },
        'warning': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.error.contrastText,
        },
        'error': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
        },
    })
)

function CountDown() {
    const classes = useStyles()
    const theme = useTheme()
    const initialCounter = useSelector(({ settings }) => settings.countdown)
    const countdownWarning = useSelector(({ settings }) => settings.countdownWarning)
    const sound = useSelector(({ settings }) => settings.sound)

    const counterInterval = useRef(0)
    const [counter, setCounter] = useState(initialCounter)

    const warningMode = useMemo(() => counter <= countdownWarning && counter > 0, [counter, countdownWarning])
    const errorMode = useMemo(() => counter < 1, [counter])
    const counterFormat = useMemo(() => {
        const minutes = (Math.abs(counter) < 600 ? '0' : '') + Math.abs(counter / 60 | 0)
        const seconds = ('0' + Math.abs(counter % 60)).substr(-2)

        return `${minutes}:${seconds}`
    }, [counter])

    useEffect(() => {
        return () => {
            clearInterval(counterInterval.current)
            counterInterval.current = 0
        }
    }, [])

    useEffect(() => {
        if (counterInterval.current === 0) setCounter(initialCounter)
    }, [initialCounter])

    const handleCountDown = () => {
        if (initialCounter > counter) {
            clearInterval(counterInterval.current)
            counterInterval.current = 0
            setCounter(initialCounter)
        } else {
            setCounter(counter - 1)
            counterInterval.current = setInterval(() =>
                setCounter(cnt => {
                    if (sound) {
                        if (cnt <= countdownWarning + 1 && cnt > 1) tick.play()
                        else if (cnt === 1) alarm.play()
                    }
                    return cnt - 1
                }),
                1000
            )
        }
    }

    return <div className={clsx(classes.countdown, {
        [classes.light]: theme.palette.type === 'light',
        [classes.warning]: theme.palette.type === 'light' && warningMode,
        [classes.error]: theme.palette.type === 'light' && errorMode,
    })}>
        <Typography className={clsx(classes.counter, {
            error: errorMode,
        })}>
            <span>{counterFormat}</span>
        </Typography>
        <Button
            onClick={handleCountDown}
            variant="contained"
            className={clsx(classes.button, {
                [classes.warning]: warningMode,
                [classes.error]: errorMode,
            })}
        >
            {counterInterval.current === 0 ? 'Start' : 'Reset'}
        </Button>
    </div>
}

export default CountDown
