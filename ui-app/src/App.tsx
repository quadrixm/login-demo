import React from 'react';
import axios from 'axios';
import './App.css';
import {Anchor, Button, Card, Col, Divider, Form, Input, Layout, message, Row} from "antd";

const {Content} = Layout;
const {Link} = Anchor;

function App() {
  const [emailOrPhone, setEmailOrPhone] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const onSignUp = () => {
    message.success('Not supported')
  }
  const onLogIn = () => {
    if (!emailOrPhone) {
      message.error('Please enter email address or phone number');
      return;
    }
    if (!password) {
      message.error('Please enter password');
      return;
    }
    if (password.length < 6) {
      message.error('Please enter valid password');
      return;
    }
    const data = {emailOrPhone, password};
    axios.post('http://127.0.0.1:3001/users/login', data)
      .then(res => {
        message.success('Log in successfully');
      })
      .catch(err => {
        console.log('err');
        console.log(err);
        message.error(err?.response?.data?.error?.message || 'Something went wrong.');
      });
  }
  const onForgottenPassword = () => {
    if (!emailOrPhone) {
      message.error('Please enter email address or phone number');
      return;
    }
    const data = {emailOrPhone};
    axios.post('http://127.0.0.1:3001/users/reset-password', data)
      .then(res => {
        message.success('Password reset instruction sent');
      })
      .catch(err => {
        message.error(err?.response?.data?.error?.message || 'Something went wrong.');
      });
  }
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Content
            style={{
              margin: '8px',
              padding: 12,
              minHeight: 280,
            }}
          >
            <Row justify={'center'}>
              <Col style={{width: '350px'}}>
                <Card>
                  <Form style={{textAlign: 'center'}}>
                    <Form.Item>
                      <Input
                        placeholder={'Email address or phone number'}
                        size={'large'}
                        onChange={(e: any) => setEmailOrPhone(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Input
                        type={'password'}
                        size={'large'}
                        placeholder={'Password'}
                        onChange={(e: any) => setPassword(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        size={'large'}
                        onClick={onLogIn}
                        style={{width: '100%'}}
                      >
                        {'Log In'}
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Anchor affix={false} onClick={onForgottenPassword}>
                        <Link href="#" title={(<b>Forgotten Password?</b>)}/>
                      </Anchor>
                    </Form.Item>
                    <Divider/>
                    <Form.Item>
                      <Button
                        type="primary"
                        size={'large'}
                        onClick={onSignUp}
                        style={{background: 'green'}}
                      >
                        {'Create New Account'}
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
