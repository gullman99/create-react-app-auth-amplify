import React from 'react';

//Styles
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

//Assets
import Caregiver from '../../img/caregiver-enhanced.jpg';
import SmilingMedical from '../../img/smiling-medical-stock.jpg';

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
        marginBottom: 50
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
    text: {
        textIndent: 80
    }
}));

function About(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <div className={classes.content}>
                    <Typography variant="h3" className={classes.header}>
                        Our Passion
                    </Typography>

                    <img src={SmilingMedical} className={classes.mainImage} />

                    <Typography variant="h5" className={classes.text}>
                        St. Lorraine's Life Care strives to endlessly improve the traditional role of caregiving for your loved ones. 
                        Our passion is in the home servicing seniors, those recovering from surgery/injury and individuals of all ages with disabilities. 
                        There is a strong pride in our passionate care we consistently effort to refine our responsibilities as homecare providers, personal fitness trainers and as a life-long friend to the highest are our highest priority.
                        A modern approach to caring for the ones we love.  and  to the wide range of nonmedical homecare and personal fitness services. For a that dedicates life-long planning to building craft the art of caregiving.
                    </Typography>
                </div>
            </div>
        </div>
    )
}


export default About