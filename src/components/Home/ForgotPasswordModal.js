import React, { useState } from 'react';

//Styles
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { CircularProgress, TextField, Typography } from '@material-ui/core';

//Amplify
import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
    dialogBox: {
        margin: 20,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
    },
    textField: {
        width: '100%'
    }
}));


function ForgotPasswordModal(props) {
    //Pass the color from the parent component to the styles
    const classes = useStyles();

    const { visible, handleClose, emailAddress } = props;

    const [email, setEmail] = React.useState(emailAddress)
    const [code, setCode] = React.useState("")
    const [password, setPassword] = React.useState("")

    const [status, setStatus] = React.useState({
        loading: false,
        error: false,
        success: false
    })

    const [passwordStatus, setPasswordStatus] = React.useState({
        loading: false,
        error: false,
        success: false
    })

    const handleVerificationSubmit = () => {
        //I know this should be a redux action but I'm time constrained so here you go
        setStatus(() => ({...status, loading: true, error: false, success: false}))


        Auth.forgotPassword(email)
            .then((data) => {
                console.log("success data", data)
                setStatus(() => ({...status, loading: false, success: data}))
            }).catch((error) => {
                // An error happened.
                console.log("error", error)
                setStatus(() => ({...status, loading: false, error: error.message}))
            });

    }

    const handlePasswordSubmit = () => {
        //I know this should be a redux action but I'm time constrained so here you go
        setStatus(() => ({...status, loading: false, error: false, success: false}))
        setPasswordStatus(() => ({...passwordStatus, loading: true, error: false, success: false}))


        Auth.forgotPasswordSubmit(email, code, password)
            .then((data) => {
                console.log("success data", data)
                setPasswordStatus(() => ({...status, loading: false, success: data}))
            }).catch((error) => {
                // An error happened.
                console.log("error", error)
                setPasswordStatus(() => ({...status, loading: false, error: error.message}))
            });

    }

    return (
        <Dialog
            open={visible}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            fullWidth={true} 
            maxWidth="xs"
        >
            <DialogContent style={{padding: 5}}>
                <div className={classes.dialogBox}>
                    {status.loading || passwordStatus.loading ?
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress />
                        </div>
                    : status.error != false || passwordStatus.error != false ?
                        <div>
                            <Typography variant="h6">
                                Error: {status.error != false ? status.error : passwordStatus.error != false ? passwordStatus.error : ""}
                            </Typography>
                            <br />
                            <Button variant="contained" color="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    : status.success != false ?
                        <div>
                            <Typography variant="h6">
                                Enter the verification code sent to {status.success.CodeDeliveryDetails.Destination}
                            </Typography>
                            <br/>
                            <TextField
                                onChange={(event) => setCode(event.target.value)}
                                name="code" 
                                variant="outlined" 
                                label="Code" 
                                autoFocus="true"
                                className={classes.textField}
                            />
                            <br />
                            <br/>
                            <TextField
                                onChange={(event) => setPassword(event.target.value)}
                                name="password" 
                                type="password"
                                variant="outlined" 
                                label="Enter Your New Password" 
                                className={classes.textField}
                            />
                            <br />
                            <br/>
                            <Button variant="contained" color="primary" onClick={handlePasswordSubmit} style={{marginRight: 20}}>
                                Submit
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    : passwordStatus.success != false ?
                        <div>
                            <Typography variant="h6">
                                Your password has successfully been reset!
                            </Typography>
                            <br/>
                            <Button variant="contained" color="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    :
                        <div>
                            <Typography variant="h6">
                                Please enter the email address you used to register:
                            </Typography>
                            <br/>
                            <TextField
                                defaultValue={emailAddress}
                                onChange={(event) => setEmail(event.target.value)}
                                name="email" 
                                variant="outlined" 
                                label="Email" 
                                autoFocus="true"
                                className={classes.textField}
                            />
                            <br/>
                            <br/>
                            <Button variant="contained" color="primary" onClick={handleVerificationSubmit} style={{marginRight: 20}}>
                                Submit
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    }
                    
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ForgotPasswordModal;
