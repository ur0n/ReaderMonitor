import React, { Component } from 'react';
import { Card } from 'element-react';
import { StyleSheet, css } from 'aphrodite';

// import { Online, Offline } from './';
import { Online } from './Online';
import { Offline } from './Offline';
import { commonStyles } from '../../config';

export const Antenna = ({children, name, status, onClick}) => {
  return (
    <div className={css(commonStyles.hMax)} onClick={onClick}>
      <Card
        className={css(commonStyles.max)}
        header={
          <div>
            <span style={{ "lineHeight": "36px" }}> { name } </span>
            <span style={{ "float": "right" }}>
              {status && ( <Online /> )}
              {!status && ( <Offline /> )}
            </span>
          </div>
        }
        >
        <div>
          {children}
        </div>
      </Card>
    </div>
  );
}
