import bcrypt from 'bcryptjs'
import  { Form, Button, Input } from 'antd'


const mySalt = '$2a$10$vraQCCXIH/exwgd0Fp4G8.'

export default function Login({setToken, setReturningUser}) {
  function handleLogin ({ email, password }) {
    const hashedPassword = bcrypt.hashSync(password, mySalt)
    fetch('https://auth-hash-api-ekm.web.app/login', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password: hashedPassword })
    })
    .then(response => response.json())
    .then(data => setToken(data.token))
    .catch(err => alert(err))
  }
  return (
    <Form
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    onFinish={handleLogin}
   >
     <h1>Login</h1>
     <Form.Item
    label="Email"
    name="email"
    rules={[{ required: true, message: 'Please input your email!'}]}
>
       <Input />
     </Form.Item>
     <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: 'Please input your password!'}]}
>
       <Input.Password />
     </Form.Item>
     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
       <Button type='primary' htmlType="Submit">Login</Button>
       &nbsp;
       <Button type='ghost' onClick={() => setReturningUser(false)}  htmlType="Submit">Go to Signup</Button>
     </Form.Item>
   </Form>
  )
}

