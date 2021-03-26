
import React,{useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField,Grid,Button,Dialog,Drawer,List,ListItem,ListItemIcon,ListItemText,Divider,CircularProgress} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import MenuIcon from '@material-ui/icons/Menu';
import PaymentIcon from '@material-ui/icons/Payment';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Lexical from './phases/lexical'
import Syntax from './phases/syntax'
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
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    }
    ))
function Vizualizer() {
    
    const classes = useStyles();
    const [step,setStep]=useState(0)
    const [drawer,setDrawer]=useState(false);
    const [dialog,setDialog]=useState(false);
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
    console.log(response.data.data)
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
      <IconButton style={{position:'fixed',top:'5px',left:'5px',background:'#75b2ad'}} onClick={()=>{
        setDrawer(true)
      }}>
          <MenuIcon style={{color:'white'}}/>
      </IconButton>
      <Drawer anchor={'left'} open={drawer} onClick={()=>{
        setDrawer(false)
      }}>
      <List className={classes.list} >
          {/* {['Home', 'New Input', 'About Us', 'Donate'].map((text, index) => (
            <div>
            <ListItem button key={text}>
              <ListItemIcon>{index==0 ? <HomeIcon/> : index==1 ? <CodeIcon/> : index==2 ? <EmojiPeopleIcon/> : <PaymentIcon/> }</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            <Divider/>
            </div>
          ))} */}
          <div>
            <Typography variant={'h5'} style={{textAlign:'center',backgroundColor:'#3AAFA9',marginTop:'-9px',color: '#17252A',fontFamily:"'Raleway', sans-serif"}}><spam style={{color:'#FEFFFF'}}>COMPILER</spam> VISUALIZER</Typography>
            <Divider/>
          <ListItem button onClick={()=>window.location.reload()}key={'Home'}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <Divider/>
            <ListItem button onClick={()=>setDialog(true)}key={'New Input'}>
              <ListItemIcon><CodeIcon/></ListItemIcon>
              <ListItemText primary={'New Input'} />
            </ListItem>
            <Divider/>
            <ListItem button onClick={()=>window.location.reload()}key={'About Us'}>
              <ListItemIcon><EmojiPeopleIcon/></ListItemIcon>
              <ListItemText primary={'About Us'} />
            </ListItem>
            <Divider/>
            <ListItem button onClick={()=>window.location.reload()}key={'Donate'}>
              <ListItemIcon><PaymentIcon/></ListItemIcon>
              <ListItemText primary={'Donate'} />
            </ListItem>
            <Divider/>
            </div>
        </List>
      </Drawer>
      <Dialog open={dialog} onClose={()=>{
        setDialog(false)
        setInput('')
        setVizStatus(false)
        setCodeStatus('RUN CODE')
        }}>
      <div style={{background:'#3AAFA9',width:'520px'}}>
        <TextField
        //   id="outlined-multiline-static"
          style={{backgroundColor:'#DEF2F1',borderRadius:'7px',width:'500px',margin:'10px'}}
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
        color={codeStatus=='NotStarted'? 'default': codeStatus=='Success' ? 'green' : 'red'}
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
        style={{marginLeft:'100px'}}
        onClick={()=>{
          setDialog(false)
          setInput('')
          setVizStatus(false)
          setCodeStatus('RUN CODE')
          }}
        disabled={!vizStatus}
      >
        VISUALIZE
      </Button>
    </div>
    </div>
    </Dialog>
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
//window.location.reload();