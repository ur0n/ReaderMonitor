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
    margin: '15px 30px',
  }
}

const Title = ({name, titleStyle}) => {
  return (
    <div style={m([styles.title, titleStyle])}>
      {name}
    </div>
  );
}

export const Header = ({title, style, titleStyle, icon}) => {
  return (
    <RowContainer style={m([styles.header, style])}>
      {icon !== undefined && (
        <div>
          <Title name={title} titleStyle={titleStyle} />
          { icon }
        </div>
      )}

      {icon === undefined && (
        <Title name={title} titleStyle={titleStyle} />
      )}
    </RowContainer>
  );
}
