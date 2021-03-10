
import React,{useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField,Grid,LinearProgress,Button,Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center',
      textJustify:'center',
      minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
      background: '#27363b',
      fontFamily:"'Yanone Kaffeesatz', sans-serif",
  },
  headText:{
      fontFamily:"'Raleway', sans-serif",
      color: '#75b2ad',
      marginTop:'15px'
  },
  textWhite:{
      fontFamily:"'Raleway', sans-serif",
      color: '#FEFFFF',
      marginTop:'15px'
  },
  simpleText:{
      fontFamily:"'Yanone Kaffeesatz', sans-serif",
      color: '#17252A'
  },
  button:{
      backgroundColor: '#17252A',
      border: 'none',
      borderRadius:'10px',
      color: '#FEFFFF',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display : 'inline-block',
      fontSize: '16px',
      fontFamily:"'Raleway', sans-serif",
      margin:'10px'
  },
  button1:{
      margin: theme.spacing(1),
      backgroundColor: '#75b2ad',
      fontFamily:"'Raleway', sans-serif",
      color: '#FEFFFF',
  }
  }
  ))
function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <div style={{marginTop:'10%',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography variant='h4' className={classes.headText}>Please wait while we get the details from the backend...</Typography>
        <ReactLoading type={'bars'} color={'#FEFFFF'} delay={10} height={300} width={150} />
    </div>
    </div>
    
  );
}

export default Loading;
