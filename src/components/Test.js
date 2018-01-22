import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Ha extends Component {
  render() {
    console.log('this.props.data', this.props.data);

    if (this.props.data.loading) {
      return <div>loading</div>;
    }
    return <div>{this.props.data.hello.message}</div>;
  }
}

const TestQuery = gql`
  query testQuery($name: String) {
    hello(name: $name) {
      message
    }
  }
`;
export default graphql(TestQuery, {
  options: ownProps => {
    return {
      fetchPolicy: 'network-only',
      variables: {
        name: 'liu',
      },
    };
  },
})(Ha);
