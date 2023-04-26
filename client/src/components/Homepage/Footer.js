import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    footer: {
      backgroundColor: 'light blue',
      padding: theme.spacing(6),
      justifyContent: "flex-end", // add this line
    },
    logo: {
      width: '30px',
      height: '30px',
      marginRight: theme.spacing(1),
    },
    social: {
      marginTop: theme.spacing(2),
    },
  }));
  

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
  <Grid container spacing={4} justify="space-between">
    <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
      {/* <Typography variant="h6" color="textPrimary">
        CONTACT US
      </Typography>
      <Typography variant="body2" color="textSecondary">
        123, Upper Bazar<br />
        Ooty, The Nilgiris <br />
        Phone: 7094546447<br />
        Email: mintor@gmail.com
      </Typography> */}
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h6" color="textPrimary">
        Follow Us
      </Typography>
      <div className={classes.social}>
        <Link href="https://www.facebook.com/" target="_blank" rel="noopener">
          <FacebookIcon className={classes.logo} style={{ color: 'black' }} />
        </Link>
        <Link href="https://www.twitter.com/" target="_blank" rel="noopener">
          <TwitterIcon className={classes.logo} style={{ color: 'black' }} />
        </Link>
        <Link href="https://www.instagram.com/" target="_blank" rel="noopener">
          <InstagramIcon className={classes.logo} style={{ color: 'black' }} />
        </Link>
      </div>
    </Grid>
  </Grid>
  <Typography variant="body2" color="textSecondary" align="center">
    © {new Date().getFullYear()} MINTOR. All rights reserved.
  </Typography>
  <Typography variant="body2" color="textSecondary" align="center">
    For any queries or feedback, please email us at mintor@gmail.com.
  </Typography>
</footer>

  );
}

export default Footer;