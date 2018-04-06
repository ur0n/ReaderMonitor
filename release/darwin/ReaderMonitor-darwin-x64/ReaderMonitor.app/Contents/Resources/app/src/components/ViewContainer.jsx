import React from 'react';
import { m } from '../lib';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export const ViewContainer = ({children, style}) => {
  return (
    <div style={m([styles.container, style])}>
      {children}
    </div>
  );
}
