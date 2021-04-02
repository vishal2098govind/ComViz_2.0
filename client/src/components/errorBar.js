
import React,{useEffect, useState} from 'react';
import {Snackbar,IconButton} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
function ErrorBar(props) {
  console.log(props.open)
  return (
    <div>
        <Snackbar
        anchorOrigin={{ vertical: 'bottom',horizontal: 'left' }}
        open={props.open}
        // key={vertical + horizontal}
      >
          {/* <Alert severity="error">This is an error message!</Alert> */}
      <MuiAlert elevation={6} variant="filled" severity={props.severity ? props.severity : 'error'}>
          <div style={{display:'inline-block'}}>
          {props.text}
      <IconButton
              aria-label="close"
              color='black'
              style={{marginLeft:'5px',padding:'0px'}}
            //   className={classes.close}
              onClick={()=>{
                  if(props.errorClose){
                    props.errorClose()
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
      </MuiAlert>
      </Snackbar>
    </div>
    
  );
}

export default ErrorBar;
