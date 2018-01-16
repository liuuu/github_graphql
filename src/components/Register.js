import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import logo from '../logo.svg';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

// const LoginForm = () => (

// );

@observer
class LoginForm extends Component {
  @observable isLoginForm = true;

  @observable email = '';
  @observable password = '';
  @observable confirmPassword = '';
  @observable error = false;

  @action
  handleChoose = () => {
    this.password = '';
    this.confirmPassword = '';
    this.email = '';
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

                  <Button color="teal" fluid size="large" disabled={this.error}>
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

export default LoginForm;
