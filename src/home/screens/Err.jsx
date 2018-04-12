import { Card } from 'element-react';
import { ErrorHeader } from './ErrorHeader';
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { commonStyles } from '../../config';

const styles = StyleSheet.create({
  err: {
    margin: '30px',
    padding: '10px',
  },
});

export const Err = ({err, handler}) => {
  return (
    <div className={css(commonStyles.max)} >
      <Card
        className={css(styles.err)}
        header={<ErrorHeader handler={handler} />}
         >
         <div className={css(commonStyles.scrollAble)}>
        { err.message }
        { err.stack }
      </div>
      </Card>
    </div>
  )
}
