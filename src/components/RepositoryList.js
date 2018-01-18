import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  Dimmer,
  Loader,
  Container,
  Segment,
  Card,
  List,
  Image,
  Icon,
  Label,
} from 'semantic-ui-react';
import logo from '../logo.svg';

import { observer, inject } from 'mobx-react';

@inject(['listStore'])
@observer
class RepositoryList extends Component {
  render() {
    if (this.props.listStore.loading) {
      return (
        <Loader active size="large">
          Loading
        </Loader>
      );
    }
    console.log(this.props.listStore.nodes);

    return (
      <List celled>
        {this.props.listStore.nodes.map(data => {
          return (
            <ListItemsWithData
              key={data.id}
              avatarUrl={data.owner.avatarUrl}
              sCounts={data.stargazers.totalCount}
              forkCounts={data.forkCount}
              watcherCounts={data.watchers.totalCount}
              description={data.description}
              nameWithOwner={data.nameWithOwner}
              url={data.url}
            />
          );
        })}
      </List>
    );
  }
}

const ListItemsWithData = ({
  nameWithOwner,
  url,
  description,
  avatarUrl,
  sCounts,
  forkCounts,
  watcherCounts,
}) => {
  console.log('avatarUrl', avatarUrl);

  return (
    <List.Item>
      <List.Content floated="left">
        <Image src={avatarUrl} size="tiny" />
      </List.Content>
      <List.Content floated="left">
        <List.Header as="a" href={url}>
          {nameWithOwner}
        </List.Header>
        <List.Description as="span">{description}</List.Description>
      </List.Content>
      <StarGroup sCounts={sCounts} forkCounts={forkCounts} watcherCounts={watcherCounts} />
    </List.Item>
  );
};

const StarGroup = ({ sCounts, forkCounts, watcherCounts }) => {
  return (
    <List.Content floated="right">
      <Label>
        <Icon name="star" color="yellow" />
        {sCounts}
      </Label>
      <Label>
        <Icon name="fork" />
        {forkCounts}
      </Label>
      <Label>
        <Icon name="eye" color="black" />
        {watcherCounts}
      </Label>
    </List.Content>
  );
};

const QUERY_LIST = gql`
  query($first: Int, $query: String!, $type: SearchType!) {
    search(first: $first, query: $query, type: $type) {
      codeCount
      nodes {
        __typename
        ... on Repository {
          id
          url
          name
          homepageUrl
          owner {
            login
            avatarUrl
          }
          nameWithOwner
          description
          createdAt
          forkCount

          watchers {
            totalCount
          }
          stargazers(first: 10) {
            totalCount
          }
          ... on RepositoryInfo {
            __typename
            shortDescriptionHTML
            resourcePath
          }
        }
      }
    }
  }
`;

export default RepositoryList;
