import { Card } from 'element-react';
import { ErrorHeader } from './ErrorHeader';
import React, { Component } from 'react';

const styles = {
  errComtainer: {
    height: '100%',
    width: '100%'
  },
  err: {
    margin: '30px',
    padding: '10px',
  }
}

export const Err = ({err, handler}) => {
  return (
    <div style={styles.errComtainer} >
      <Card
        style={styles.err}
        header={<ErrorHeader handler={handler} />}
         >
         <div style={{overflow: 'scroll'}}>
        { err.message }
        { err.stack }
      </div>
      </Card>
    </div>
  )
}
