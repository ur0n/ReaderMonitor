import React, { Component } from 'react';
import { LogText } from './LogText';
import { colors } from '../config';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-around',
    justifyContent: 'space-around'
  },
  logText: {
    color: colors.darkWhite,
    fontSize: '13px',
    fontFamiry: 'Helvetica Neue',
    alignSelf: 'flex-start',
    margin: '5px 0 0 10px',
  },
}

export const RFIDReport = ({ip, port, id, rssi, time, phase}) => {
  return (
    <div style={styles.container}>
      <LogText style={styles.logText} text={ip} />
      <LogText style={styles.logText} text={port} />
      <LogText style={styles.logText} text={id} />
      <LogText style={styles.logText} text={rssi} />
      <LogText style={styles.logText} text={time} />
      <LogText style={styles.logText} text={phase} />
    </div>
  );
}
