import React from 'react';
import { RowContainer } from './';
import { colors } from '../config';

const styles = {
  header: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: colors.elBorderColor,
    borderWidth: '0 0 1px 0'
  },
  title: {
    flex: 1,
    alignSelf: 'flex-start',
    margin: '10px',
  }
}

const Title = ({name}) => {
  return (
    <div style={styles.title}>
      {name}
    </div>
  );
}

export const Header = ({title}) => (
  <RowContainer style={styles.header}>
    <Title name={title} />
  </RowContainer>
)
