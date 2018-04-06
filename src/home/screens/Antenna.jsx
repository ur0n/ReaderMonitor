import React, { Component } from 'react';
import { Card } from 'element-react';
// import { Online, Offline } from './';
import { Online } from './Online';
import { Offline } from './Offline';

const styles = {
  antenna: {
    width: '100%',
    height: '100%'
  }
}

export const Antenna = ({children, name, status, onClick}) => {
  return (
    <div style={{height: '100%'}} onClick={onClick}>
      <Card
        style={styles.antenna}
        header={
          <div>
            <span style={{ "lineHeight": "36px" }}> { name } </span>
            <span style={{ "float": "right" }}>
              {status && (
                <Online />
              )}

              {!status && (
                <Offline />
              )}
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
