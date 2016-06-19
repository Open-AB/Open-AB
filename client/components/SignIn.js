import React from 'react';

function SignIn() {
  return (
    <div>
      <h2>Sign In</h2>
      <form action="/api/signin" method="post">
        <div>
          <label>Email:</label>
          <input id="email" type="text" name="email" />
        </div>
        <div>
          <label>Password:</label>
          <input id="password" type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      <p>
        <a href="/signup">Create an Account &rarr;</a>
      </p>
    </div>
  );
}

export default SignIn;
