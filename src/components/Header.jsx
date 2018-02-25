import React from 'react';
import { RowContainer } from './';

const styles = {
  header: {
    alignSelf: 'stretch',
    backgroundColor: 'red'
  }
}
export const Header = ({title}) => (
  <RowContainer style={styles.header}>
    {title}
  </RowContainer>
)
