import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField,Grid,LinearProgress,Button,Paper} from '@material-ui/core'
import CustomizedTables from '../materialTable'
import ReactTable from '../reactTable'
import Graph from '../graph'
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';


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
function Syntax() {
  const classes = useStyles();
const [visualize,setVisualize]=useState(true)
const [loading,setLoading]=useState(false)
const [step,setStep]=useState(0)
let tokenListData=[{
    tokenType:'Operators',
    tokenList:' +, =, -, *, / '
}, {tokenType:'Operators',
tokenList:' +, =, -, *, / '
},{tokenType:'Operators',
tokenList:' +, =, -, *, / '
}]

let tokenListColumns=[{
    Header: 'Token Type',
    accessor: 'tokenType'
},
{
    Header: 'Token List',
    accessor: 'tokenList'
}]

let symbolTableData=[{
  var:'NULL',
  varVal:'0'
}, {var:'TRUE',
varVal:'1'
},{var:'FALSE',
varVal:'0'
},{var:'a',
varVal:'8'
},{var:'b',
varVal:'9'
}]

let symbolTableColumns=[{
  Header: 'Variable',
  accessor: 'var'
},
{
  Header: 'Variable Value',
  accessor: 'varVal'
}]

let grammarTableColumns=[{
  Header: 'Vertices',
  accessor: 'terminal'
},
{
  Header: 'Productions',
  accessor: 'prod'
}]

let grammarTableData=[{
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

const syntaxStep=()=>{
    // if(step<0){
    //   setStep(0)
    // }else if(step>2){
    //   setStep(2)
    // }
    switch(step){
        case 0: return(
        <div style={{display:'inline-block',marginTop:'-12px'}}>
        <div style={{display:'inline-block', marginBottom: '20px'}}>
        <ReactTable data={grammarTableData} columns={grammarTableColumns}
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
        )
        case 1: return(
            <div style={{display:'inline-block'}}>
        <ReactTable 
        // data={symbolTableData} columns={symbolTableColumns}
        />
        </div>
        )
        case 2: return(
            <div>
                <Grid container spacing={3}>
                   <Grid item md={7.2}>
                     <div style={{marginTop:'40px'}}>
                      <ReactTable 
                      size={'small'}
          />
                     </div>
                   
                   </Grid>
                   <Grid item md={4}>
                      <Graph/>
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
