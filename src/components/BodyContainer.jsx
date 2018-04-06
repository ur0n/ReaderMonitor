import React, { Component } from 'react';
import { ColumnContainer } from './';
import { colors } from '../config';
import { Link, withRouter } from 'react-router-dom';
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
    height: '100px'
  }
}

const Reader = ({children, onClick}) => {
  return (
    <div onClick={onClick}>
      <Card style={styles.reader} >
        <div>
          {children}
        </div>
      </Card>
    </div>
  );
}

class Body extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <ColumnContainer style={styles.body}>
        {
          (
            [1, 2, 3].map(i => {
              const inner = [1, 2, 3, 4].map(j => {
                return (
                  <Layout.Col key={j} span="5">
                    <Reader onClick={() => this.props.history.push(`/reader/1`)}>
                      { `${i}:${j}`}
                    </Reader>
                  </Layout.Col>
                )
              })
              return (
                <Layout.Row key={i} style={styles.row} gutter="50">
                  { inner }
                </Layout.Row>
              )
            })
          )
        }
      </ColumnContainer>
    );
  }
}

export const BodyContainer = withRouter(Body);
