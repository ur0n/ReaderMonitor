import React from 'react';
import { m } from '../lib';
import { ViewContainer } from './';

const styles = {
  row: {
    flexDirection: 'row'
  }
}

export const RowContainer = ({children, style}) => {
  return (
    <ViewContainer style={m([styles.row, style])}>
      {children}
    </ViewContainer>
  );
}
