import React from 'react';
import { m } from '../lib';
import { ViewContainer } from './';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});

export const RowContainer = ({children, style}) => {
  return (
    <ViewContainer style={[styles.row, style]}>
      {children}
    </ViewContainer>
  );
}
