import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Graph from './components/graph';
import ReactTable from './components/reactTable';
import Loading from './components/loading';
import { makeStyles } from '@material-ui/core/styles';
import Intro from './components/intro';
import Visualizer from './components/visualizer';
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
    background: '#3AAFA9',
    fontFamily: "'Yanone Kaffeesatz', sans-serif",
  },
}));

function App() {
  const classes = useStyles();
  const [visualize, setVisualize] = useState(false);
  const [loading, setLoading] = useState(false);
  const startVisualizer = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisualize(true);
    }, 3000);
  };
  return (
    <div className={classes.root1}>
      {/* <Graph/> */}
      {/* <ReactTable/> */}
      {/* <Loading/> */}
      {visualize ? (
        <Visualizer />
      ) : !loading ? (
        <Intro setVisualize={startVisualizer} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
