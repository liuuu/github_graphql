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
  // name: 'allLinksQuery',
  options: ownProps => {
    // const page = parseInt(ownProps.match.params.page, 10);
    // const isNewPage = ownProps.location.pathname.includes('new');
    // const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    // const first = isNewPage ? LINKS_PER_PAGE : 10;
    // const orderBy = isNewPage ? 'createdAt_DESC' : null;
    return {
      fetchPolicy: 'network-only',
      variables: {
        name: 'liu',
      },
    };
  },
})(Ha);
