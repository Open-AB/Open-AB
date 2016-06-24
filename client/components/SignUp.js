import React from 'react';

function SignUp() {
  return (
    <div>
      <h2>Sign Up</h2>
      <form action="/api/signup" method="post">
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

export default SignUp;
