import React from 'react';
import { css } from 'aphrodite';

export const LogText = ({text, style}) => {
  return (
    <p className={css(style)}>
      { text }
    </p>
  );
}
