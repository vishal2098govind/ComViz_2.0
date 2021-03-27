import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  TextField,
  Grid,
  LinearProgress,
  Button,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textJustify: 'center',
    minHeight:
      typeof window !== 'undefined'
        ? window.innerHeight
        : '-webkit-fill-available',
    background: '#27363b',
    fontFamily: "'Yanone Kaffeesatz', sans-serif",
  },
  headText: {
    fontFamily: "'Raleway', sans-serif",
    color: '#75b2ad',
    marginTop: '15px',
  },
  textWhite: {
    fontFamily: "'Raleway', sans-serif",
    color: '#FEFFFF',
    marginTop: '15px',
  },
  simpleText: {
    fontFamily: "'Yanone Kaffeesatz', sans-serif",
    color: '#17252A',
  },
  button: {
    backgroundColor: '#17252A',
    border: 'none',
    borderRadius: '10px',
    color: '#FEFFFF',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    fontFamily: "'Raleway', sans-serif",
    margin: '10px',
  },
  button1: {
    margin: theme.spacing(1),
    backgroundColor: '#80a879',
    fontFamily: "'Raleway', sans-serif",
    color: '#FEFFFF',
  },
}));

function Graph(props) {
  const classes = useStyles();
  const [slideshow, setSlideshow] = useState(false);
  const [parserType, setParserType] = useState(props.parserType);
  const dots = useSelector(state =>
    props.parserType == 'topDown'
      ? state.topDownDigraphs
      : state.bottomUpDigraphs
  );
  const [dotIndex, setDotIndex] = useState(0);
  const [dotArrayIndex, setDotArrayIndex] = useState(0);
  const d3 = window.d3;
  useEffect(() => {
    console.log('csknkn');
    console.log(parserType);
    console.log(props.parserType);
    if (parserType != props.parserType) {
      setDotArrayIndex(0);
      setDotIndex(0);
    }
  }, [props.parserType]);
  useEffect(() => {
    function attributer(datum, index, nodes) {
      var selection = d3.select(this);
      if (datum.tag == 'svg') {
        // var width = window.innerWidth/2-540;
        // var height = window.innerHeight/2-90;
        var width = window.innerWidth / 4;
        var height = window.innerHeight / 2;
        var x = 0;
        var y = 0;
        var scale = 0.6;
        selection
          .attr('width', width + 'pt')
          .attr('height', height + 'pt')
          .attr(
            'viewBox',
            -x + ' ' + -y + ' ' + width / scale + ' ' + height / scale
          );
        datum.attributes.width = width + 'pt';
        datum.attributes.height = height + 'pt';
        datum.attributes.viewBox =
          -x + ' ' + -y + ' ' + width / scale + ' ' + height / scale;
      }
    }

    function transitionFactory() {
      return d3.transition('main').ease(d3.easeLinear).delay(40).duration(1000);
    }

    var graphviz = d3
      .select('#graph')
      .graphviz()
      .logEvents(false)
      .transition(transitionFactory)
      .tweenShapes(false)
      .on('initEnd', render)
      .attributer(attributer);
    const productions = [
      ['int', 'E'],
      ['int', 'E1'],
      ['int', 'T'],
      ['int', 'T1'],
    ];
    function render() {
      if (slideshow) {
        let dotLines =
          props.parserType == 'topDown'
            ? dots[dotIndex % dots.length].digraph
            : dots[dotIndex % dots.length];
        // props.productionColor(productions[i % productions.length][0],productions[i % productions.length][1])
        // i+=1;
        let dot = dotLines.join('');
        graphviz.renderDot(dot).on('end', function () {
          setDotIndex(dotIndex + 1);
          //   if((dotIndex % dots.length)==1){
          //     props.productionColor('int','E')
          // }else{
          //   props.productionColor('int','F')
          // }
          if (dotIndex != dots.length) {
            render();
            if (props.parserType == 'topDown')
              props.productionColor(
                dots[dotIndex % dots.length].index.col,
                dots[dotIndex % dots.length].index.row
              );
          }
        });
      } else {
        let dotLines =
          props.parserType == 'topDown'
            ? dots[dotArrayIndex].digraph
            : dots[dotArrayIndex];
        console.log(dots[dotArrayIndex]);
        if (props.parserType == 'topDown')
          props.productionColor(
            dots[dotArrayIndex].index.col,
            dots[dotArrayIndex].index.row
          );

        //   if(dotArrayIndex==1){
        //     props.productionColor('int','E')
        // }else{
        //   props.productionColor('int','F')
        // }
        let dot = dotLines.join('');
        graphviz.renderDot(dot);
      }
    }

    var colors = d3.schemeCategory20;
  });

  return (
    <div style={{ display: 'inline-block' }}>
      <Paper elevation={24}>
        <div id='graph'></div>
      </Paper>

      <div>
        <Button
          variant='contained'
          color='default'
          className={classes.button1}
          disabled={dotArrayIndex == 0 || slideshow}
          startIcon={<SkipPreviousIcon />}
          onClick={() => {
            setDotArrayIndex(dotArrayIndex - 1);
          }}
        >
          PREV
        </Button>
        <Button
          variant='contained'
          color='default'
          className={classes.button1}
          // endIcon={<SkipNextIcon />}
          onClick={() => {
            setSlideshow(!slideshow);
            setDotArrayIndex(0);
            setDotIndex(0);
          }}
        >
          {`SlideShow ${slideshow ? 'OFF' : 'ON'}`}
        </Button>
        <Button
          variant='contained'
          color='default'
          className={classes.button1}
          disabled={dotArrayIndex >= dots.length - 1 || slideshow}
          endIcon={<SkipNextIcon />}
          onClick={() => {
            setDotArrayIndex(dotArrayIndex + 1);
          }}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
}

export default Graph;
