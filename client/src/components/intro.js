
import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography,TextField,Button,CircularProgress } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import {addCompilerData} from '../redux/ruleAction'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center',
        textJustify:'center',
        minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
        background: '#3AAFA9',
        fontFamily:"'Yanone Kaffeesatz', sans-serif",
      },
    headText:{
        fontFamily:"'Raleway', sans-serif",
        color: '#17252A',
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
        backgroundColor: '#17252A',
        fontFamily:"'Raleway', sans-serif",
        color: '#FEFFFF',
    }
}
))
function Intro(props) {
const classes = useStyles();
const [start,setStart]=useState(false)
const dispatch=useDispatch();
const [compilerInput,setInput]=useState('')
const [vizStatus,setVizStatus]=useState(false);
const [codeStatus,setCodeStatus]=useState('RUN CODE');
const [loading,setLoading]=useState(false)
const callBackend=async()=>{
  setLoading(true)
  const form = new FormData();
  form.append('source_code',compilerInput);
  try{
    const response = await Axios({
      method: 'post',
      url: 'http://localhost:8000/submit_code',
      data: form,
    });
    dispatch(addCompilerData(response.data.data))
    setLoading(false)
    setVizStatus(true)
    setCodeStatus('SUCCESS')
  }catch{
    setVizStatus(false)
    setCodeStatus('FAILED')
    setLoading(false)
  }
}

const inputChange=(e)=>{
  setInput(e.target.value)
}
const First=()=>{
    return(
        <div>
        <Typography variant='h1' className={classes.headText}>
            <spam style={{color:'#FEFFFF'}}>COMPILER</spam> VISUALIZER
        </Typography>
        <Typography variant='h4' className={classes.simpleText}>
        In computing, a compiler is a program that translates the code written in one language to <br/>some other language without changing the meaning of the program.<br/>
        </Typography>
        <Button
        variant="contained"
        color="default"
        className={classes.button1}
        style={{marginTop:'10px',height:'40px',width:'150px'}} onClick={()=>{setStart(!start)}}
      >
        START
      </Button>
        </div>
    )
}
const Second=()=>{
    return(
        <div>
        <Typography variant='h1' className={classes.headText} style={{marginTop:'-20px'}}>
            <spam style={{color:'#FEFFFF'}}>COMPILER</spam> VISUALIZER
        </Typography>
        <TextField
        //   id="outlined-multiline-static"
          style={{backgroundColor:'#DEF2F1',borderRadius:'7px',width:'600px'}}
        //   label="Write code here.."
          multiline
          rows={5}
          placeholder="Write your code here.."
          variant="outlined"
          value={compilerInput}
          onChange={inputChange}
        />
        
        <div >
        <Button
        variant="contained"
        color="default"
        className={classes.button1}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
        <Button
        variant="contained"
        // color={codeStatus=='NotStarted'? 'default': codeStatus=='Success' ? 'green' : 'red'}
        style={{background:`${codeStatus=='RUN CODE'? '': codeStatus=='SUCCESS' ? 'green' : 'red'}`}}
        className={classes.button1}
        endIcon={<SettingsEthernetIcon />}
        onClick={callBackend}
      >
        {loading ? <CircularProgress style={{height:'24px',width:'24px',margin:'0px 22px'}} /> : `${codeStatus}`}
      </Button>
      
        <Button
        variant="contained"
        color="default"
        className={classes.button1}
        endIcon={<PlayCircleOutlineIcon />}
        style={{marginLeft:'190px'}}
        onClick={()=>{props.setVisualize(true)}}
        disabled={!vizStatus}
      >
        VISUALIZE
      </Button>
        </div>
        <div style={{marginTop:'40px'}}>
            <Typography variant='h3' className={classes.headText}>
            <spam style={{color:'#FEFFFF'}}>What you will see</spam><br/>in our Visualizer?
            </Typography>
            <Typography variant='h5' className={classes.headText}>
            <spam style={{color:'#FEFFFF'}}>1. Lexical Analysis Phase with</spam><br/>symbol table and token list
            </Typography>
            <Typography variant='h5' className={classes.headText}>
            <spam style={{color:'#FEFFFF'}}>2. Syntax Analysis Phase with</spam><br/>parse table and parse tree
            </Typography>
            <Typography variant='h5' className={classes.headText}>
            <spam style={{color:'#FEFFFF'}}>3. Creation of Parse Tree</spam> <br/> and AST with Animation
            </Typography>
            <Typography variant='h5' className={classes.headText}>
            <spam style={{color:'#FEFFFF'}}>4. Final</spam> Result
            </Typography>
        </div>
        </div>
    )
}
  return (
    <div className={classes.root}>
        { start ? Second() : First()}
    </div>
  );
}

export default Intro;
