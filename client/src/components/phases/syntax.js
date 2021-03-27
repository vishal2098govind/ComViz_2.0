import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField,Grid,LinearProgress,Button,Paper,Select,MenuItem} from '@material-ui/core'
import CustomizedTables from '../materialTable'
import ReactTable from '../reactTable'
import Graph from '../graph'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import {useSelector} from 'react-redux'
import dfa from '../../images/dfa.svg'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign:'center',
    textJustify:'center',
    minHeight: typeof window !== 'undefined' ? window.innerHeight : '-webkit-fill-available',
    background: '#3AAFA9',
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
    color: '#75b2ad'
},
button1:{
    margin: theme.spacing(1),
    backgroundColor: '#75b2ad',
    fontFamily:"'Raleway', sans-serif",
    color: '#FEFFFF',
}
}
))
function Syntax(props) {
  const classes = useStyles();
const [visualize,setVisualize]=useState(true)
const [loading,setLoading]=useState(false)
const [step,setStep]=useState(0)
const [terminal,setTerminal]=useState('-')
const [nonTerminal,setNonTerminal]=useState('x')
const [parserType,setParserType]=useState('topDown')
const tokenListData=useSelector(state=>state.tokens)
const compilerInput=useSelector(state=>state.compilerInput)
// let tokenListData=['< int : 1 >','< KEYWORD : AND >','< int : 0 >','< EOF >']
let tokenListColumns=[]
tokenListColumns.push({
  Header: 'Token List',
  accessor: 'tokenList'
})
tokenListData.forEach((col)=>{
  tokenListColumns.push({
    Header: col,
    accessor: col
  })
})

let grammarTableColumns=[{
  Header: 'Vertices',
  accessor: 'terminal'
},
{
  Header: 'Productions',
  accessor: 'prod'
}]
let topDowngrammarTableData=[{
  terminal: 'E',
  prod: '-> var ID=E | CE1'
},
{
  terminal: 'E1',
  prod: '-> AND CE1 | OR CE1 | e'
},
{
  terminal: 'C',
  prod: '-> NOT C | AC1'
},
{
  terminal: 'C1',
  prod: '-> <AC1 | <=AC1 | >AC1 | >=AC1 | ==AC1 | !=AC1 | e '
},
{
  terminal: 'A',
  prod: '-> TA1'
},
{
  terminal: 'A1',
  prod: '-> + TA1 | - TA1 | e'
},
{
  terminal: 'T',
  prod: '-> FT1'
},
{
  terminal: 'T1',
  prod: '-> * FT1 | / FT1 | e'
},
{
  terminal: 'F',
  prod: '-> +P | -P | P'
},
{
  terminal: 'P',
  prod: '-> L ^ P | L'
},
{
  terminal: 'L',
  prod: '-> int | float | ID | (E)'
},
]
let bottomUpgrammarTableData=[{
  terminal: 'E',
  prod: '-> var ID=E | E and C | E or C | C'
},
{
  terminal: 'C',
  prod: '-> NOT C | C==Ar | C>=Ar | C<=Ar | C<Ar | C>Ar | Ar '
},
{
  terminal: 'Ar',
  prod: '-> Ar+T | Ar-T | T'
},
{
  terminal: 'T',
  prod: '-> T*F | T/F | F'
},
{
  terminal: 'F',
  prod: '-> +P | -P | P'
},
{
  terminal: 'P',
  prod: '-> A ^ P | A'
},
{
  terminal: 'A',
  prod: '-> int | float | ID | (E)'
},
]
let ab={abrv:["Expression (Var-Assignment expressions or logical expressions )","Comparison Expression","Arithmetic  Expression","Identifier","=","Keyword to indicate variable declaration","Term","Factor","Power","Atom","epsilon","Integer and Floating number","Paranthesis","Keyword to indicate logical AND, OR & NOT","Comprison operators"],
          term:["E","C","ArE","ID","EQ","VAR","T","F","P","A","e","INT, FLOAT","( )","AND, OR & NOT",">=,<=,<,>,=="]
}
let abColumn=[{
  Header: 'Term',
  accessor: 'term'
},
{
  Header: 'Abbreviation',
  accessor: 'abr'
}]

let abData=[]
ab.term.forEach((val,index)=>{
  abData.push({
    term: val,
    abr : ab.abrv[index]
  })
}) 


let dummyColumn=[{
  Header: '',
  accessor: 'terminal'
},
{
  getProps: (state, rowInfo) => {
    if (rowInfo && rowInfo.row) {
      return {
        style: {
          background:
            rowInfo.row.int ? "red" : null
        }
      };
    } else {
      return {};
    }
  },
  Header: "int",
  accessor: "int"
},]

let dummyData=[{
  terminal: 'A',
  int: '-> TA1'
},
{
  terminal: 'A',
  int: '-> TA1'
},
{
  terminal: 'B',
  int: '-> TA1'
},
]
const productionColor=(t,nt)=>{
  setTerminal(t)
  setNonTerminal(nt)
  console.log('color')
}
const syntaxStep=()=>{
    // if(step<0){
    //   setStep(0)
    // }else if(step>2){
    //   setStep(2)
    // }
    switch(step){
        case 0: return(
        <div>
          {
            parserType!='topDown' ? <div style={{position:'fixed',right:'0',top:'10%'}}><Button variant="contained"
            color="default"
            className={classes.button1}><a href={dfa} alt='Image description' target="_blank" rel='noreferrer' style={{textDecoration:'none',color:'white'}}>Show DFA</a></Button></div> : ''
          }
        
        <div style={{display:'inline-block',marginTop:'-12px'}}>
        <div style={{display:'inline-block', marginBottom: `${parserType!='topDown' ? '90px' :'20px'}`}}>
        <ReactTable data={parserType=='topDown' ?  topDowngrammarTableData : bottomUpgrammarTableData} columns={grammarTableColumns}
          size={'large'}
        />
        </div>
        <div style={{display:'inline-block'}}>
        <ReactTable 
        // data={grammarTableData} columns={grammarTableColumns}
        data={abData} columns={abColumn}
        />
        </div>
        </div>
        </div>
        )
        case 1: return(
            <div style={{display:'inline-block'}}>
              {
                parserType=='topDown' ? <ReactTable parserType={parserType}/> : <div style={{height:'500px',overflow:'auto',margin:'0px'}}><ReactTable parserType={parserType}/></div>
              }
        
        </div>
        )
        case 2: return(
            <div>
                <div style={{position:'fixed',right:'0',top:'8%'}}>
            <TextField style={{backgroundColor:'#DEF2F1',borderRadius:'7px',marginTop:'10px'}} value={compilerInput} disabled={true} onClick={()=>{props.openDialog()}}/>     
            <Button variant="contained"
            color="default"
            className={classes.button1}>Show Symbol Table</Button></div>
                <Grid container spacing={3}>
                   <Grid item md={7.2}>
                     <div style={{marginTop:'10px'}}>
                       {
                         parserType=='topDown' ? <ReactTable size={'small'}
                         terminal={terminal}
                         nonTerminal={nonTerminal}
                          parserType={parserType}/> : <div style={{height:'400px',width:'800px',overflow:'auto',margin:'0px'}}><ReactTable size={'small'}
                          terminal={terminal}
                          nonTerminal={nonTerminal} parserType={parserType}/></div>
                       }
          <ReactTable columns={tokenListColumns}
          inverted={true} type={'tokenList'} size={'small'}/>
                     </div>
                   
                   </Grid>
                   <Grid item md={4}>
                      <Graph productionColor={productionColor} parserType={parserType} />
                   </Grid>
                </Grid>
                  
            </div>
        )
        
        default: return(<div>shush</div>)
    }

}
const title=[{
    first: 'Grammar',
    second: 'Table'
},{
    first: 'Parse',
    second: 'Table'
},{
    first: 'Parse Table ',
    second: '& AST'
},]
  return (
    <div className={classes.root1}>
    <Typography variant='h3' className={classes.headText} style={{marginTop:'43px'}}>
            <spam style={{color:'#FEFFFF'}}>{title[step].first}</spam> {title[step].second}
    </Typography>
        {syntaxStep()}
    <div>
    <Button
        variant="contained"
        color="default"
        className={classes.button1}
        disabled={step==0}
        startIcon={<SkipPreviousIcon />}
        onClick={()=>{setStep(step-1)}}
      >
        PREVIOUS STEP
    </Button>
        <Button
        variant="contained"
        color="default"
        className={classes.button1}
      >
        <Select
          // labelId="demo-simple-select-filled-label"
          // id="demo-simple-select-filled"
          value={parserType}
          defaultValue={parserType}
          onChange={(e)=>{
            setParserType(e.target.value)
            console.log(e.target.value)
          }}
        >
          <MenuItem value={'topDown'}>
            Top-Down Parser
          </MenuItem>
          <MenuItem value={'bottomUp'}>Bottom-Up Parser</MenuItem>
        </Select>
      </Button>
    <Button
        variant="contained"
        color="default"
        className={classes.button1}
        disabled={step==2}
        endIcon={<SkipNextIcon />}
        onClick={()=>{setStep(step+1)}}
      >
        NEXT STEP
      </Button>
    </div>
    
    </div>
  );
}

export default Syntax;
