import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField,Grid,LinearProgress,Button,Paper} from '@material-ui/core'
import CustomizedTables from '../materialTable'
import ReactTable from '../reactTable'
import Graph from '../graph'


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
}
))
function Lexical() {
  const classes = useStyles();
const [visualize,setVisualize]=useState(true)
const [loading,setLoading]=useState(false)

// let tokenListData=[{
//   token:'< int: 1 >'
// },{
//   token:'< + >'
// },{
//   token:'< int: 2 >'
// },{
//   token:'< EOF >'
// }]

// let tokenListColumns=[{
//   Header: 'Token List',
//   accessor: 'token'
// }]
let tokenListData=['< int: 1 >','< + >','< int: 2 >','< EOF >']
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

// let symbolTableData=[{
//   var:'NULL',
//   varVal:'0'
// }, {var:'TRUE',
// varVal:'1'
// },{var:'FALSE',
// varVal:'0'
// },{var:'a',
// varVal:'1'
// }]

// let symbolTableColumns=[{
//   Header: 'Variable',
//   accessor: 'var'
// },
// {
//   Header: 'Variable Value',
//   accessor: 'varVal'
// }]

let syData= {'var': ['NULL', 'TRUE', 'FALSE','age'], 'var_value': [0, 1, 0, 22]}
let symbolTableColumns=[]
symbolTableColumns.push({
  Header :'Variable',
  accessor: 'var'

})
let symbolTableData=[]
let object={}
object['var']='Variable Value'
syData.var.forEach((col,index)=>{
  symbolTableColumns.push({
    Header: col,
    accessor: col
  })
  
  object[col]=String(syData.var_value[index])
  
})
symbolTableData.push(object)




  return (
    // <div className={classes.root1} style={{flexGrow:0.7}}>
    // <Grid container spacing={3} direction="row"
    //     justify="space-between"
    //     alignItems="center"
    // >
    // <Grid item md={6} style={{}}>
    // <Typography variant='h3' className={classes.headText}>
    //         <spam style={{color:'#FEFFFF'}}>Token </spam> List
    // </Typography>
    // {/* <Typography variant='h5' className={classes.simpleText} style={{textAlign:'start'}}>
    // - The lexical analyzer breaks syntaxes into a series of tokens, by removing any whitespace or comments in the source code.
    // </Typography> */}
    // <div style={{display:'inline-block'}}>
    //     <ReactTable 
    //     data={tokenListData} columns={tokenListColumns}
    //     />
    // </div>
    // </Grid>
    // <Grid item md={6}>
    // <Typography variant='h3' className={classes.headText}>
    //         <spam style={{color:'#FEFFFF'}}>Symbol </spam> Table
    // </Typography>
    // <div style={{display:'inline-block'}}>
    //     <ReactTable 
    //     data={symbolTableData} columns={symbolTableColumns}
    //     />
    // </div>
    // </Grid>
    // </Grid>
    
    // </div>
    <div>
      <Typography variant='h3' className={classes.headText}>
             <spam style={{color:'#FEFFFF'}}>Token </spam> List
      </Typography>
        <ReactTable 
          columns={tokenListColumns}
          inverted={true} type={'tokenList'}
          />

         <Typography variant='h3' className={classes.headText} style={{marginTop:'60px'}}>
             <spam style={{color:'#FEFFFF'}}>Symbol </spam> Table
      </Typography>

      <ReactTable 
         data={symbolTableData} columns={symbolTableColumns}
         inverted={true}
         /> 
    </div>
  );
}

export default Lexical;
