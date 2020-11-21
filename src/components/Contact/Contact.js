import React from 'react';

//Styles
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Assets
import ContactLaptop from '../../img/contact-laptop.jpg';
import Caregiver from '../../img/caregiver-enhanced.jpg';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        width: '100%',
        display: 'grid',
        placeItems: 'center center'
    },
    main: {
        height: '100%',
        width: 1200,
    },
    content: {
        marginTop: 30,
        marginBottom: 30,
        textAlign: 'center'
    },
    header: {
        textAlign: 'center',
    },
    mainImage: {
        width: '100%',
        height: 500,
        objectFit: 'cover',
        marginTop: 30,
        marginBottom: 30
    },
    icon: {
        marginTop: 30,
        marginBottom: 30
    },
    text: {
        lineHeight: 1.8
    }
}));

function Contact(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <div className={classes.content}>
                    <Typography variant="h3" className={classes.header}>
                        Get Started
                    </Typography>

                    <img src={ContactLaptop} className={classes.mainImage} />
                    {/* <FontAwesomeIcon icon={faIdCard} size="6x" className={classes.icon} /> */}

                    <Typography variant="h5" className={classes.text}>
                        <a href = "mailto: st.lorraineslifecare@gmail.com">st.lorraineslifecare@gmail.com</a>
                        <br />
                        (262) 308-5450
                    </Typography>
                </div>
            </div>
        </div>
    )
}


export default Contact