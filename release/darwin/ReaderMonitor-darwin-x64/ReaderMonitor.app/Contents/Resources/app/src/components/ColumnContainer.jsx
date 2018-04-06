import React from 'react';
import { m } from '../lib';
import { ViewContainer } from './';

const styles = {
  row: {
    flexDirection: 'column'
  }
}

export const ColumnContainer = ({children, style}) => (
  <ViewContainer style={m([styles.row, style])}>
    {children}
  </ViewContainer>
)
