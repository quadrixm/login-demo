import React from 'react';
import './App.css';
import {Anchor, Button, Card, Col, Divider, Form, Input, Layout, Row} from "antd";
const { Content } = Layout;
const { Link } = Anchor;

function App() {
  const [emailOrPhone, setEmailOrPhone] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const onSubmit = () => {
    const data = {emailOrPhone, password};
    console.log(data)
  }
  const onForgottenPassword = () => {
    const data = {emailOrPhone, password};
    console.log(data)
  }
  return (
    <div className="App">
      <Layout id={'components-layout-demo-custom-trigger'}>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: '8px',
              padding: 12,
              minHeight: 280,
            }}
          >

            <Row justify={'center'}>
              <Col style={{ width: '350px' }}>
                <Card>
                  <Form style={{ textAlign: 'center' }}>
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
                        onClick={onSubmit}
                        style={{ width: '100%' }}
                      >
                        {'Log In'}
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Anchor affix={false} onClick={onForgottenPassword}>
                        <Link href="#" title={(<b>Forgotten Password?</b>)} />
                      </Anchor>
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                      <Button
                        type="primary"
                        size={'large'}
                        onClick={onSubmit}
                        style={{ background: 'green' }}
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
