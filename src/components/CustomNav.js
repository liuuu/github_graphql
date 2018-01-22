import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Input,
  Tab,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SearchMenu from './SearchMenu';

export default class CustomNav extends Component {
  render() {
    return (
      <Segment inverted textAlign="center" style={{ minHeight: 70, padding: '1em 0em' }} vertical>
        <Container>
          <Menu inverted pointing secondary size="large">
            <Menu.Item as="a">Home</Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Menu position="right">
              <SearchMenu />
              <Menu.Item>
                <Link to="/register">
                  <Button as="a">Log in</Button>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/register">
                  <Button as="a">Sign Up</Button>
                </Link>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
    );
  }
}
