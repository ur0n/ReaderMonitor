import { Button } from 'element-react';
import React, { Component } from 'react';

export const ErrorHeader = ({handler}) => {
  return (
    <div>
      <span style={{ "lineHeight": "36px" }}> Connection Error! </span>
      <span style={{ "float": "right" }}>
        <Button onClick={() => handler()} type="primary"> Retry! </Button>
      </span>
    </div>
  );
}
