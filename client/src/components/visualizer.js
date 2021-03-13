
import React,{useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField,Grid,LinearProgress,Button,Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Lexical from './phases/lexical'
import Syntax from './phases/syntax'
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
function Vizualizer() {
    
    const classes = useStyles();
    const [step,setStep]=useState(0)

    const phaseRender=()=>{
      switch(step){
        case 0: 
          return <Lexical/>
        case 1: 
          return <Syntax/>
        default: <Lexical/>
      }
    }
  return (
    <div className={classes.root}>
    <Typography variant='h2' className={classes.headText} style={{position:'fixed',bottom:'650px'}}>
            <spam style={{color:'#FEFFFF'}}> {step==0? 'LEXICAL': 'SYNTAX'} </spam> ANALYSIS
    </Typography>
    {phaseRender()}
    <div style={{position:'fixed'}}>
    <Button
        variant="contained"
        color="default"
        className={classes.button1}
        style={{marginTop:'10px',height:'40px',width:'190px',top:'335px',right:'571px'}} 
        startIcon={<SkipPreviousIcon />}
        disabled={step==0}
        onClick={()=>{setStep(step-1)}}
      >
        PREVIOUS PHASE
    </Button>
    <Button
        variant="contained"
        color="default"
        className={classes.button1}
        style={{marginTop:'10px',height:'40px',width:'150px',left:'570px',top:'335px'}}
        endIcon={<SkipNextIcon />}
        disabled={step==1}
        onClick={()=>{setStep(step+1)}}
      >
        NEXT PHASE
      </Button>
    </div>
    </div>
    
  );
}

export default Vizualizer;
//vizualizer#27363b#75b2ad#FEFFFF