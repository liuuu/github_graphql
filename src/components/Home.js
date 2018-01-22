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
import RepositoryList from './RepositoryList';
import CustomNav from './CustomNav';

const FixedMenu = () => (
  <Menu fixed="top" size="large">
    <Container>
      <Menu.Item as="a" active>
        Home
      </Menu.Item>
      <Menu.Item as="a">Work</Menu.Item>
      <Menu.Item as="a">Company</Menu.Item>
      <Menu.Item as="a">Careers</Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">
            <Button as="a">Log in</Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">
            <Button as="a">Sign Up</Button>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

// const panes = [
//   {
//     menuItem: 'JavaScript',
//     render: () => (
//       <Tab.Pane>
//         <RepositoryList />
//       </Tab.Pane>
//     ),
//   },
// ];

export default class HomepageLayout extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ visible: false });
  showFixedMenu = () => this.setState({ visible: true });

  render() {
    const { visible } = this.state;

    return (
      <div>
        <CustomNav />

        <Container>
          <Divider fitted />

          <RepositoryList />
        </Container>
      </div>
    );
  }
}
