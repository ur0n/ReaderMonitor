import React from 'react';
import { RowContainer } from './';
import { m } from '../lib';
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

const Title = ({name, titleStyle}) => {
  return (
    <div style={m([styles.title, titleStyle])}>
      {name}
    </div>
  );
}

export const Header = ({title, style, titleStyle}) => (
  <RowContainer style={m([styles.header, style])}>
    <Title
      name={title}
      titleStyle={titleStyle}
    />
  </RowContainer>
)
