import React from 'react';

//Styles
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Typography } from '@material-ui/core';

//Assets
import Schedule from '../../img/schedule.jpg';
import Teamwork from '../../img/teamwork.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: 'auto',
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
    subheading: {
        textAlign: 'center',
        marginTop: 15
    },
    mainImage: {
        width: '100%',
        height:500,
        objectFit: 'cover',
        marginTop: 30,
        marginBottom: 30
    },
    gridImage: {
        width: '100%',
        height: 150,
        objectFit: 'cover',
    },
    text: {
        textIndent: 80
    },
    grid: {

    }
}));

function Jobs(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <div className={classes.content}>
                    <Typography variant="h3" className={classes.header}>
                        Employment
                    </Typography>
                    
                    <Typography variant="h4" className={classes.subheading}>
                        “For some, a pivotal stepping stone.
                        <br/> 
                        For others, a life-long journey.”
                    </Typography>

                    <img src={Teamwork} className={classes.mainImage} />

                    <Typography variant="h5" className={classes.text}>
                        St. Lorraine’s care providers and fitness trainers are revered as having the highest level of affectionate care met with sheer patience and integrity. These positions are perfect for young men and women interested in the medical field because they provide health experience with a diversity of clients.
                     </Typography>

                    <div style={{marginTop: 80, marginBottom: 80, textAlign: 'center'}}>
                        <Typography variant="h4">
                            Click the link below to view the application!
                        </Typography>
                        <div style={{display: 'grid',  placeItems: 'center center', margin:  15}}>
                            <Button variant='outlined' color="primary">
                                View application
                            </Button>
                        </div>
                    </div>

                    <Grid container alignItems="center" className={classes.grid}>
                        <Grid item xs>
                            <Typography variant="h4">
                                Interested in fitness?
                                <br  />
                                Create your own schedule 				
                                and change lives.
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <img src={Schedule} className={classes.gridImage} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}


export default Jobs