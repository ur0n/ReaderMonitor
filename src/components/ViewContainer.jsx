import React from 'react';
import { m } from '../lib';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  t: {
    backgroundColor: 'black'
  },
  t2: {
    margin: '500px',
  }
})

export const ViewContainer = ({children, style}) => {
  const flatStyles = style.reduce((p, c) => {
    if(Array.isArray(c)){
      return [...p, ...c];
    } else {
      return [...p, c];
    }
  }, [])

  return (
    <div className={css(styles.container, flatStyles)}>
      {children}
    </div>
  );
}
