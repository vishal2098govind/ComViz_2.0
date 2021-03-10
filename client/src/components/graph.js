import React,{useEffect, useState} from 'react';
import {AppBar,Toolbar,IconButton,Typography,InputBase,TextField,Grid,LinearProgress,Button,Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';


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
      backgroundColor: '#80a879',
      fontFamily:"'Raleway', sans-serif",
      color: '#FEFFFF',
  }
  }
  ))
function Graph() {
  const classes = useStyles();
const [slideshow,setSlideshow]=useState(false);
const [dotArrayIndex,setDotArrayIndex]=useState(0)
console.log(window);
const d3=window.d3;
// var dots = [
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952ca60" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cb50" [label="T1"];    "0x149f952ca60" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cbe0" [label="P"];    "0x149f952cc70" [label="A"];    "0x149f952cd00" [label="<int:1>"];    "0x149f952cb50" [label="T1"];    "0x149f952ca60" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";    "0x149f952cb20" -> "0x149f952cbe0";    "0x149f952cbe0" -> "0x149f952cc70";    "0x149f952cc70" -> "0x149f952cd00";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cbe0" [label="P"];    "0x149f952cc70" [label="A"];    "0x149f952cd00" [label="<int:1>"];    "0x149f952cb50" [label="T1"];    "0x149f952cc10" [label="e"];    "0x149f952ca60" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";    "0x149f952cb20" -> "0x149f952cbe0";    "0x149f952cbe0" -> "0x149f952cc70";    "0x149f952cc70" -> "0x149f952cd00";    "0x149f952cb50" -> "0x149f952cc10";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cbe0" [label="P"];    "0x149f952cc70" [label="A"];    "0x149f952cd00" [label="<int:1>"];    "0x149f952cb50" [label="T1"];    "0x149f952cc10" [label="e"];    "0x149f952ca60" [label="E1"];    "0x149f952cb80" [label="< + >"];    "0x149f952cbb0" [label="T"];    "0x149f952cc40" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";    "0x149f952cb20" -> "0x149f952cbe0";    "0x149f952cbe0" -> "0x149f952cc70";    "0x149f952cc70" -> "0x149f952cd00";    "0x149f952cb50" -> "0x149f952cc10";    "0x149f952ca60" -> "0x149f952cb80";    "0x149f952ca60" -> "0x149f952cbb0";    "0x149f952ca60" -> "0x149f952cc40";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cbe0" [label="P"];    "0x149f952cc70" [label="A"];    "0x149f952cd00" [label="<int:1>"];    "0x149f952cb50" [label="T1"];    "0x149f952cc10" [label="e"];    "0x149f952ca60" [label="E1"];    "0x149f952cb80" [label="< + >"];    "0x149f952cbb0" [label="T"];    "0x149f952cd90" [label="F"];    "0x149f952cdc0" [label="T1"];    "0x149f952cc40" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";    "0x149f952cb20" -> "0x149f952cbe0";    "0x149f952cbe0" -> "0x149f952cc70";    "0x149f952cc70" -> "0x149f952cd00";    "0x149f952cb50" -> "0x149f952cc10";    "0x149f952ca60" -> "0x149f952cb80";    "0x149f952ca60" -> "0x149f952cbb0";    "0x149f952ca60" -> "0x149f952cc40";    "0x149f952cbb0" -> "0x149f952cd90";    "0x149f952cbb0" -> "0x149f952cdc0";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cbe0" [label="P"];    "0x149f952cc70" [label="A"];    "0x149f952cd00" [label="<int:1>"];    "0x149f952cb50" [label="T1"];    "0x149f952cc10" [label="e"];    "0x149f952ca60" [label="E1"];    "0x149f952cb80" [label="< + >"];    "0x149f952cbb0" [label="T"];    "0x149f952cd90" [label="F"];    "0x149f952ce50" [label="P"];    "0x149f952cee0" [label="A"];    "0x149f952cf70" [label="<int:2>"];    "0x149f952cdc0" [label="T1"];    "0x149f952cc40" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";    "0x149f952cb20" -> "0x149f952cbe0";    "0x149f952cbe0" -> "0x149f952cc70";    "0x149f952cc70" -> "0x149f952cd00";    "0x149f952cb50" -> "0x149f952cc10";    "0x149f952ca60" -> "0x149f952cb80";    "0x149f952ca60" -> "0x149f952cbb0";    "0x149f952ca60" -> "0x149f952cc40";    "0x149f952cbb0" -> "0x149f952cd90";    "0x149f952cbb0" -> "0x149f952cdc0";    "0x149f952cd90" -> "0x149f952ce50";    "0x149f952ce50" -> "0x149f952cee0";    "0x149f952cee0" -> "0x149f952cf70";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cbe0" [label="P"];    "0x149f952cc70" [label="A"];    "0x149f952cd00" [label="<int:1>"];    "0x149f952cb50" [label="T1"];    "0x149f952cc10" [label="e"];    "0x149f952ca60" [label="E1"];    "0x149f952cb80" [label="< + >"];    "0x149f952cbb0" [label="T"];    "0x149f952cd90" [label="F"];    "0x149f952ce50" [label="P"];    "0x149f952cee0" [label="A"];    "0x149f952cf70" [label="<int:2>"];    "0x149f952cdc0" [label="T1"];    "0x149f952ce80" [label="e"];    "0x149f952cc40" [label="E1"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";    "0x149f952cb20" -> "0x149f952cbe0";    "0x149f952cbe0" -> "0x149f952cc70";    "0x149f952cc70" -> "0x149f952cd00";    "0x149f952cb50" -> "0x149f952cc10";    "0x149f952ca60" -> "0x149f952cb80";    "0x149f952ca60" -> "0x149f952cbb0";    "0x149f952ca60" -> "0x149f952cc40";    "0x149f952cbb0" -> "0x149f952cd90";    "0x149f952cbb0" -> "0x149f952cdc0";    "0x149f952cd90" -> "0x149f952ce50";    "0x149f952ce50" -> "0x149f952cee0";    "0x149f952cee0" -> "0x149f952cf70";    "0x149f952cdc0" -> "0x149f952ce80";}',
//     ],
//     [
//       'digraph tree {    "0x149f9235fd0" [label="E"];    "0x149f952c5b0" [label="T"];    "0x149f952cb20" [label="F"];    "0x149f952cbe0" [label="P"];    "0x149f952cc70" [label="A"];    "0x149f952cd00" [label="<int:1>"];    "0x149f952cb50" [label="T1"];    "0x149f952cc10" [label="e"];    "0x149f952ca60" [label="E1"];    "0x149f952cb80" [label="< + >"];    "0x149f952cbb0" [label="T"];    "0x149f952cd90" [label="F"];    "0x149f952ce50" [label="P"];    "0x149f952cee0" [label="A"];    "0x149f952cf70" [label="<int:2>"];    "0x149f952cdc0" [label="T1"];    "0x149f952ce80" [label="e"];    "0x149f952cc40" [label="E1"];    "0x149f952ceb0" [label="e"];    "0x149f9235fd0" -> "0x149f952c5b0";    "0x149f9235fd0" -> "0x149f952ca60";    "0x149f952c5b0" -> "0x149f952cb20";    "0x149f952c5b0" -> "0x149f952cb50";    "0x149f952cb20" -> "0x149f952cbe0";    "0x149f952cbe0" -> "0x149f952cc70";    "0x149f952cc70" -> "0x149f952cd00";    "0x149f952cb50" -> "0x149f952cc10";    "0x149f952ca60" -> "0x149f952cb80";    "0x149f952ca60" -> "0x149f952cbb0";    "0x149f952ca60" -> "0x149f952cc40";    "0x149f952cbb0" -> "0x149f952cd90";    "0x149f952cbb0" -> "0x149f952cdc0";    "0x149f952cd90" -> "0x149f952ce50";    "0x149f952ce50" -> "0x149f952cee0";    "0x149f952cee0" -> "0x149f952cf70";    "0x149f952cdc0" -> "0x149f952ce80";    "0x149f952cc40" -> "0x149f952ceb0";}',
//     ],
//   ];
var dots=[['digraph tree {    "E0" [label=E];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "A16" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "T18" [label=T1];    "A16" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "T18" [label=T1];    "A16" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "T18" [label=T1];    "A16" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "A16" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "A115" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "T117" [label=T1];    "A115" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "T117" [label=T1];    "A115" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "L19" [label=L];    "T117" [label=T1];    "A115" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";    "P18" -> "L19";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "L19" [label=L];    "number20" [label=< int:2 >];    "T117" [label=T1];    "A115" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";    "P18" -> "L19";    "L19" -> "number20";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];"8a2e24f490b34d90a5c6985b2887dd9b" [label=< int:2 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "L19" [label=L];    "number20" [label=< int:2 >];    "T117" [label=T1];    "e21" [label=e];    "A115" [label=A1];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";    "P18" -> "L19";    "L19" -> "number20";    "T117" -> "e21";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];"8a2e24f490b34d90a5c6985b2887dd9b" [label=< int:2 >];}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "L19" [label=L];    "number20" [label=< int:2 >];    "T117" [label=T1];    "e21" [label=e];    "A115" [label=A1];    "e22" [label=e];    "C14" [label=C1];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";    "P18" -> "L19";    "L19" -> "number20";    "T117" -> "e21";    "A115" -> "e22";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];"8a2e24f490b34d90a5c6985b2887dd9b" [label=< int:2 >];"3a78248383e34ef785660b32b6ea15f0" [label=< + >];"3a78248383e34ef785660b32b6ea15f0" -> "8a2e24f490b34d90a5c6985b2887dd9b";"3a78248383e34ef785660b32b6ea15f0" -> "f1f5c75c392644859119fda37509e10f";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "L19" [label=L];    "number20" [label=< int:2 >];    "T117" [label=T1];    "e21" [label=e];    "A115" [label=A1];    "e22" [label=e];    "C14" [label=C1];    "e23" [label=e];    "E12" [label=E1];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";    "P18" -> "L19";    "L19" -> "number20";    "T117" -> "e21";    "A115" -> "e22";    "C14" -> "e23";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];"8a2e24f490b34d90a5c6985b2887dd9b" [label=< int:2 >];"3a78248383e34ef785660b32b6ea15f0" [label=< + >];"3a78248383e34ef785660b32b6ea15f0" -> "8a2e24f490b34d90a5c6985b2887dd9b";"3a78248383e34ef785660b32b6ea15f0" -> "f1f5c75c392644859119fda37509e10f";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "L19" [label=L];    "number20" [label=< int:2 >];    "T117" [label=T1];    "e21" [label=e];    "A115" [label=A1];    "e22" [label=e];    "C14" [label=C1];    "e23" [label=e];    "E12" [label=E1];    "e24" [label=e];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";    "P18" -> "L19";    "L19" -> "number20";    "T117" -> "e21";    "A115" -> "e22";    "C14" -> "e23";    "E12" -> "e24";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];"8a2e24f490b34d90a5c6985b2887dd9b" [label=< int:2 >];"3a78248383e34ef785660b32b6ea15f0" [label=< + >];"3a78248383e34ef785660b32b6ea15f0" -> "8a2e24f490b34d90a5c6985b2887dd9b";"3a78248383e34ef785660b32b6ea15f0" -> "f1f5c75c392644859119fda37509e10f";}'], ['digraph tree {    "E0" [label=E];    "C1" [label=C];    "A3" [label=A];    "T5" [label=T];    "F7" [label=F];    "P9" [label=P];    "L10" [label=L];    "number11" [label=< int:1 >];    "T18" [label=T1];    "e12" [label=e];    "A16" [label=A1];    "+/-13" [label=< + >];    "T14" [label=T];    "F16" [label=F];    "P18" [label=P];    "L19" [label=L];    "number20" [label=< int:2 >];    "T117" [label=T1];    "e21" [label=e];    "A115" [label=A1];    "e22" [label=e];    "C14" [label=C1];    "e23" [label=e];    "E12" [label=E1];    "e24" [label=e];    "E0" -> "C1";    "E0" -> "E12";    "C1" -> "A3";    "C1" -> "C14";    "A3" -> "T5";    "A3" -> "A16";    "T5" -> "F7";    "T5" -> "T18";    "F7" -> "P9";    "P9" -> "L10";    "L10" -> "number11";    "T18" -> "e12";    "A16" -> "+/-13";    "A16" -> "T14";    "A16" -> "A115";    "T14" -> "F16";    "T14" -> "T117";    "F16" -> "P18";    "P18" -> "L19";    "L19" -> "number20";    "T117" -> "e21";    "A115" -> "e22";    "C14" -> "e23";    "E12" -> "e24";"f1f5c75c392644859119fda37509e10f" [label=< int:1 >];"8a2e24f490b34d90a5c6985b2887dd9b" [label=< int:2 >];"3a78248383e34ef785660b32b6ea15f0" [label=< + >];"3a78248383e34ef785660b32b6ea15f0" -> "8a2e24f490b34d90a5c6985b2887dd9b";"3a78248383e34ef785660b32b6ea15f0" -> "f1f5c75c392644859119fda37509e10f";}']]
useEffect(()=>{
    function attributer(datum, index, nodes) {
        var selection = d3.select(this);
        if (datum.tag == "svg") {
            // var width = window.innerWidth/2-540;
            // var height = window.innerHeight/2-90;
            var width = window.innerWidth/4;
            var height = window.innerHeight/2;
            var x = 0;
            var y = 0
            var scale = 0.6;
            selection
                .attr("width", width + "pt")
                .attr("height", height + "pt")
                .attr("viewBox", -x + " " + -y + " " + (width / scale) + " " + (height / scale));
            datum.attributes.width = width + "pt";
            datum.attributes.height = height + "pt";
            datum.attributes.viewBox = -x + " " + -y + " " + (width / scale) + " " + (height / scale);
        }
    }
    
    function transitionFactory() {
        return d3.transition("main")
            .ease(d3.easeLinear)
            .delay(40)
            .duration(1000);
    }
    
    var dotIndex = 0;
    var graphviz = d3.select("#graph").graphviz()
        .logEvents(false)
        .transition(transitionFactory)
        .tweenShapes(false)
        .on("initEnd", render)
        .attributer(attributer);
    
    function render() {
      if(slideshow){
        console.log('call1')
        let dotLines = dots[dotIndex % dots.length];
        let dot = dotLines.join('');
      graphviz
          .renderDot(dot)
          .on("end", function () {
              dotIndex += 1;
              if (dotIndex != dots.length) {
                  render();
              }
          });
      }else{
        console.log('call2')
        let dotLines = dots[dotArrayIndex];
        let dot = dotLines.join('');
        graphviz
            .renderDot(dot)
            .on("end", function () {
                dotIndex += 1;
                if (dotIndex != dots.length) {
                    render();
                }
            });
      }    
    }
    
    var colors = d3.schemeCategory20;
    
})

  return (
    <div style={{display:'inline-block'}}>
      <Paper elevation={24}>
      <div id='graph'>
        </div>
      </Paper>
        
        <div><Button
        variant="contained"
        color="default"
        className={classes.button1}
        disabled={dotArrayIndex==0 || slideshow}
        startIcon={<SkipPreviousIcon />}
        onClick={()=>{setDotArrayIndex(dotArrayIndex-1)}}
      >
        PREV
    </Button>
    <Button
        variant="contained"
        color="default"
        className={classes.button1}
        // endIcon={<SkipNextIcon />}
        onClick={()=>{setSlideshow(!slideshow)
                setDotArrayIndex(0)
        }}
      >
        {`SlideShow ${slideshow ? 'OFF' : 'ON'}`}
      </Button>
    <Button
        variant="contained"
        color="default"
        className={classes.button1}
        disabled={dotArrayIndex>=dots.length-1 || slideshow}
        endIcon={<SkipNextIcon />}
        onClick={()=>{setDotArrayIndex(dotArrayIndex+1)}}
      >
        NEXT
      </Button></div>
    </div>
  );
}

export default Graph;
