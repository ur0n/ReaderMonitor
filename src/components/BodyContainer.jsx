import React from 'react';
import { ColumnContainer } from './';
import { colors } from '../config';
import { Card } from 'element-react';

const styles = {
  body: {
    flex: 9,
    alignSelf: 'stretch',
    backgroundColor: colors.blueWhite
  }
}
export const BodyContainer = () => {
  return (
    <ColumnContainer style={styles.body}>
      <Card>
        <div>aaaa</div>
      </Card>
    </ColumnContainer>
  );
}
