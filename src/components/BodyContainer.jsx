import React from 'react';
import { ColumnContainer } from './';
import { colors } from '../config';
import { Card, Layout } from 'element-react';

const styles = {
  body: {
    flex: 9,
    alignSelf: 'stretch',
    backgroundColor: colors.blueWhite
  },
  row: {
    margin: '50px 0 50px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  reader: {
    height: '200px'
  }
}

const Reader = ({children}) => {
  return (
    <Card style={styles.reader}>
      {children}
    </Card>
  );
}
export const BodyContainer = () => {
  return (
    <ColumnContainer style={styles.body}>
      <Layout.Row style={styles.row} gutter="50">
        <Layout.Col span="8">
          <div className="grid-content bg-purple">
            <Reader>
              Reader
            </Reader>
          </div>
        </Layout.Col>
        <Layout.Col span="8">
          <div className="grid-content bg-purple">
            <Reader>
              Reader
            </Reader>
          </div>
        </Layout.Col>
        <Layout.Col span="8">
          <div className="grid-content bg-purple">
            <Reader>
              Reader
            </Reader>
          </div>
        </Layout.Col>
      </Layout.Row>
      <Layout.Row style={styles.row} gutter="50">
        <Layout.Col span="8">
          <div className="grid-content bg-purple">
            <Reader>
              Reader
            </Reader>
          </div>
        </Layout.Col>
        <Layout.Col span="8">
          <div className="grid-content bg-purple">
            <Reader>
              Reader
            </Reader>
          </div>
        </Layout.Col>
        <Layout.Col span="8">
          <div className="grid-content bg-purple">
            <Reader>
              Reader
            </Reader>
          </div>
        </Layout.Col>
      </Layout.Row>
    </ColumnContainer>
  );
}
