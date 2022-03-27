const EMAIL_CONTENT = {
  VERIFY_EMAIL: {
    SUBJECT:
      'Hill Street Books - Please verify your email to activate your account!',
    BODY: `<p>Please verify your email to activate your account.</p>
    <p>This link will expire in <b>1 hour</b>.</p>
    <p>Click <a href=%url%>here</a> to activate.</p>
    <p>Or click the below link to activate.</p>
    <a href=%url%>%url%</a>`
  },
  PASSWORD_RESET: {
    SUBJECT: 'Hill Street Books - Password Reset',
    BODY: `<p>This link will expire in <b>1 hour</b>.</p>
    <p>Please reset your password by clicking <a href=%url%>here</a>.</p>
    <p>Or click the below link to reset your password.</p>
    <a href=%url%>%url%</a>`
  },
  DEFAULT: {
    SUBJECT: 'Hill Street Books - Error',
    BODY: `<p>Oops, Something went wrong>. Please contact the administrator.</p>`
  }
};

export { EMAIL_CONTENT };
