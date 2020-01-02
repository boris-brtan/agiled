import React from 'react'
import { Dialog, DialogContent, DialogTitle, FormControl, RadioGroup, FormControlLabel, Radio, Switch, FormGroup, TextField, makeStyles, createStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { setScale, toggleSettings, toggleSound, setCountdown, setCountdownWarning, toggleOnline, toggleCloseOnVote } from '../actions/settings'

const useStyles = makeStyles((theme) =>
    createStyles({
        number: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            display: 'block',
        }
    })
)

function Settings() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const scale = useSelector((state) => state.settings.scale)
    const sound = useSelector((state) => state.settings.sound)
    const open = useSelector((state) => state.settings.open)
    const countdown = useSelector((state) => state.settings.countdown)
    const countdownWarning = useSelector((state) => state.settings.countdownWarning)
    const online = useSelector((state) => state.settings.online)
    const closeOnVote = useSelector((state) => state.settings.closeOnVote)

    const handleClose = () => {
        dispatch(toggleSettings(false))
    }

    const handleChangeScale = (e) => {
        dispatch(setScale(e.target.value | 0))
    }

    const handleToggleSound = () => {
        dispatch(toggleSound(!sound))
    }

    const handleChangeCountdown = (e) => {
        dispatch(setCountdown(e.target.value | 0))
    }

    const handleChangeCountdownWarning = (e) => {
        const val = countdown < e.target.value | 0 ? countdown : e.target.value | 0
        dispatch(setCountdownWarning(val))
    }

    const handleToggleOnline = () => {
        dispatch(toggleOnline(!online))
    }

    const handleToggleCloseOnVote = () => {
        dispatch(toggleCloseOnVote(!closeOnVote))
    }

    return <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle>
            Settings
        </DialogTitle>
        <DialogContent dividers>
            <FormControl component="fieldset">
                <RadioGroup name="scale" value={scale} onChange={handleChangeScale}>
                    {['Standard', 'Fibonacci', 'T-shirts'].map((item, idx) => {
                        return <FormControlLabel
                            control={<Radio />}
                            key={item}
                            label={item}
                            value={idx}
                        />
                    })}
                </RadioGroup>
            </FormControl>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={closeOnVote} onChange={handleToggleCloseOnVote} />}
                    label="Close menu after vote"
                />
            </FormGroup>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={sound} onChange={handleToggleSound} />}
                    label="Sound"
                />
            </FormGroup>
            <TextField
                className={classes.number}
                required
                label="Countdown limit (s)"
                type="number"
                inputProps={{
                    min: 0,
                }}
                value={countdown}
                onInput={handleChangeCountdown}
            />
            <TextField
                className={classes.number}
                required
                label="Countdown warning limit (s)"
                type="number"
                inputProps={{
                    min: 0,
                }}
                error={countdown < countdownWarning}
                value={countdownWarning}
                onInput={handleChangeCountdownWarning}
            />
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={online} onChange={handleToggleOnline} />}
                    label="Offline (Singleplayer)"
                    disabled
                />
            </FormGroup>
        </DialogContent>
    </Dialog>
}

export default Settings
