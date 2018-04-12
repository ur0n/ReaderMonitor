import React, { Component } from 'react';
import { Card } from 'element-react';
import { StyleSheet, css } from 'aphrodite';
// import { Online, Offline } from './';
import { Online } from './Online';
import { Offline } from './Offline';
import { commonStyles } from '../../config';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    alignSelf: 'center',
    margin: '0 5px'
  },
  status: {
    margin: '0 5px'
  }
})

export const Antenna = ({children, name, status, onClick}) => {
  return (
    <div className={css(commonStyles.hMax)} onClick={onClick}>
      <Card className={css(commonStyles.max)}>
        <div className={css(styles.container)}>
          <span className={css(styles.title)}> { name } </span>
          <span className={css(styles.status)}>
            {status && ( <Online /> )}
            {!status && ( <Offline /> )}
          </span>
        </div>
      </Card>
    </div>
  );
}
