import React from 'react';
import { SideBar, RowContainer, BodyContainer } from './';

const styles = {
  home: {
    alignSelf: 'stretch',
    height: '100%'
  }
}

export const Home = () => {
  return (
    <RowContainer style={styles.home}>
      <SideBar />
      <BodyContainer />
    </RowContainer>
  );
}
