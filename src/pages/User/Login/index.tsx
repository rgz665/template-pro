import { APP_INDEX } from '@/constants';
import { accountLogin } from '@/services';
import { encryptByAES } from '@/utils';
import { useUpdateInitialState } from '@/utils/hooks';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, SelectLang } from '@umijs/max';
import { Alert, message } from 'antd';
import React, { useState } from 'react';

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});

  const { updateInitialState } = useUpdateInitialState();

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  // 获取用户信息
  const getBaseUserInfo = async () => {
    await updateInitialState();
    message.success('登录成功！');
    history.push(APP_INDEX);
  };

  const handleSubmit = async (values: any) => {
    const params = {
      ...values,
      password: encryptByAES(values.password),
    };

    // 登录
    const res = await accountLogin(params);
    if (res?.code === 200) {
      await getBaseUserInfo();
      return;
    }

    // 如果失败去设置用户错误信息
    setUserLoginState({
      status: 'error',
    });
  };

  const { status } = userLoginState;

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>登录页</title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          title="中台通用模版"
          subTitle={'v1.0.0'}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {status === 'error' && <LoginMessage content={'账户或密码错误'} />}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={'用户名: '}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={'密码:'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
