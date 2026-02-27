const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            data-testid="username"
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            data-testid="password"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        login
      </button>
    </form>
  );
};

export default LoginForm;
