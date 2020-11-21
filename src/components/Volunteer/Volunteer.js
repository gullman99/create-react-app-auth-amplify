import React from 'react';

//Styles
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

//Assets
import Caregiver from '../../img/caregiver-enhanced.jpg';
import VolunteerHands from '../../img/volunteer.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100%',
        width: '100%',
        display: 'grid',
        placeItems: 'center center'
    },
    main: {
        height: '100%',
        width: 960,
    },
    content: {
        marginTop: 30,
        marginBottom: 50
    },
    header: {
        textAlign: 'center',
    },
    mainImage: {
        width: '100%',
        height: 400,
        objectFit: 'cover',
        marginTop: 30,
        marginBottom: 30
    },
    text: {
        textIndent: 80
    }
}));

function Volunteer(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <div className={classes.content}>
                    <Typography variant="h3" className={classes.header}>
                        Volunteer
                    </Typography>

                    <img src={VolunteerHands} className={classes.mainImage} />

                    <Typography variant="h5" className={classes.text}>
                        There are countless reasons why an extraordinary person would find self-fulfilment in the angelic responsibilities of a St. Lorraine’s volunteer. Many of our caretakers and personal trainers found their inspirations through years of memorable volunteer experiences. At St. Lorraines, volunteers can gain experience and knowledge as a homecare provider or personal fitness trainer that works with a wide range of ages and disabilities. Those who are interested in the medical field, whether it is nursing or therapy, will develop a unique skill set caring for seniors and learning  with the plethora of disabilities and mental health situations in our volunteer programs. 
                    </Typography>
                </div>
            </div>
        </div>
    )
}


export default Volunteer