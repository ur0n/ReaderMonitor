import React from 'react';
import { m } from '../lib';
import { ViewContainer } from './';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  }
});

export const ColumnContainer = ({children, style}) => (
  <ViewContainer style={[styles.column, style]}>
    {children}
  </ViewContainer>
)
