import React from 'react';
import { m } from '../lib';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const ViewContainer = ({children, style}) => {
  return (
    <div className={css(styles.container, style)}>
      {children}
    </div>
  );
}
