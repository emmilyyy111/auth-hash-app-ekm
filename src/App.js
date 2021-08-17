import bcrypt from 'bcryptjs'
import  { Form, Button, Input } from 'antd'
import 'antd/dist/antd.css'

const mySalt = '$2a$10$vraQCCXIH/exwgd0Fp4G8.'

export default function App() {
  function handleSignup ({ email, password }) {
    const hashedPassword = bcrypt.hashSync(password, mySalt)
    fetch('https://auth-hash-api-ekm.web.app/signup', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password: hashedPassword })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(err => alert(err))
  }
  return (
    <Form
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    onFinish={handleSignup}
   >
     <h1>Sign up</h1>
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
       <Button type='primary' htmlType="Submit">Sign up</Button>
     </Form.Item>
   </Form>
   
  )
}

