import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo from '../logo.svg';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

// const LoginForm = () => (

// );

@observer
class LoginForm extends Component {
  @observable isLoginForm = true;

  @observable email = '';
  @observable username = '';
  @observable password = '';
  @observable confirmPassword = '';
  @observable error = false;

  @action
  handleChoose = () => {
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
    this.username = '';
    this.error = false;
    this.isLoginForm = !this.isLoginForm;
  };

  @action
  handleEmail = e => {
    this.email = e.target.value;
  };

  @action
  handlePassword = e => {
    this.password = e.target.value;
  };
  @action
  handleConfirmPassword = e => {
    this.confirmPassword = e.target.value;
    if (this.confirmPassword !== this.password) {
      this.error = true;
    } else {
      this.error = false;
    }
  };

  saveUserData = (id, token) => {
    localStorage.setItem('N_USER_ID', id);
    localStorage.setItem('N_AUTH_TOKEN', token);
  };

  handleSubmit = async () => {
    if (this.isLoginForm) {
      const result = await this.props.authenticateUserMutation({
        variables: {
          email: this.email,
          password: this.password,
        },
      });
      const { id, token } = result.data.authenticateUser;
      console.log('result', result);

      this.saveUserData(id, token);
    } else {
      const result = await this.props.signupUserMutation({
        variables: {
          name: this.username,
          email: this.email,
          password: this.password,
        },
      });
      console.log('result', result);

      const { id, token } = result.data.signupUser;
      this.saveUserData(id, token);
    }
    // this.props.history.push('/');
  };

  // @computed get matchedPass (){
  //   if(!this.isLoginForm && this.password===this.confirmPassword){
  //     return
  //   }
  //   return true
  // }

  render() {
    return (
      <div className="login-form">
        {this.isLoginForm && (
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src={logo} /> Log-in to your account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={this.email}
                    onChange={this.handleEmail}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={this.password}
                    onChange={this.handlePassword}
                  />

                  <Button color="teal" fluid size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        )}
        {!this.isLoginForm && (
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src={logo} /> Log-in to your account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="username"
                    value={this.username}
                    onChange={e => {
                      this.username = e.target.value;
                    }}
                  />
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={this.email}
                    onChange={this.handleEmail}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={this.password}
                    onChange={this.handlePassword}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    error={this.error}
                    value={this.confirmPassword}
                    onChange={this.handleConfirmPassword}
                  />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    disabled={this.error}
                    onClick={this.handleSubmit}
                  >
                    {this.isLoginForm ? 'login' : 'signup'}
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        )}
        <ChooseForm handleChoose={this.handleChoose} isLoginForm={this.isLoginForm} />
      </div>
    );
  }
}

const ChooseForm = ({ handleChoose, isLoginForm }) => {
  return (
    <div>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message>
            New to us? <button onClick={handleChoose}>{isLoginForm ? 'signUp' : 'signIn'}</button>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUserMutation($email: String!, $password: String!, $name: String!) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`;

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      id
      token
    }
  }
`;

export default compose(
  graphql(SIGNUP_USER_MUTATION, { name: 'signupUserMutation' }),
  graphql(AUTHENTICATE_USER_MUTATION, { name: 'authenticateUserMutation' })
)(LoginForm);
