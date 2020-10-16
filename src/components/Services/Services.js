import React from 'react';

//Styles
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

//Assets
import HomeTherapy from '../../img/home-therapy.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        height: 'auto',
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
    body: {

    },
    text: {
        textDecoration: 'underline'
    },
    list: {
        lineHeight: 1.5, 
        fontSize: 18
    }
}));

function Services(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <div className={classes.content}>
                    <Typography variant="h3" className={classes.header}>
                        Services
                    </Typography>

                    <img src={HomeTherapy} className={classes.mainImage} />

                    <div className={classes.body}>
                        <Typography variant="h5" className={classes.text}>
                            Seniors {'&'} Injury Recoveries:
                        </Typography>

                        <ul className={classes.list} >
                            <li>
                                Non Medical Homecare 
                                <ul>
                                    <li>
                                        Companionship
                                        <ul>
                                            <li>
                                                Friendly visits including socializing, puzzles, games, watching TV, and many other non medical activities providing emotional and social support. 
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Assisted Daily Living
                                        <ul>
                                            <li>
                                                Help with mobility, dressing, meal prep, light house cleaning, bathing, grooming, toileting, continence and other special considerations.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <Typography variant="h5" className={classes.text}>
                            Disabilities:
                        </Typography>

                        <ul className={classes.list} >
                            <li>
                                At-Home Personal Fitness
                                <ul>
                                    <li>
                                        Unique health and fitness workouts tailored to client’s disability. Using the client’s interests and other fun activities to stay active and set goals towards a brighter, healthy future. 
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Respite Care
                                <ul>
                                    <li>
                                        Giving guardians and primary care takers their well desired rest or time off. Also great for date nights!
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Services