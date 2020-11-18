// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import {HttpErrors, post, requestBody} from '@loopback/rest';

const CredentialsSchema = {
  type: 'object',
  required: ['emailOrPhone', 'password'],
  properties: {
    emailOrPhone: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },
};

const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

type Credentials = {
  emailOrPhone: string;
  password: string;
};

type ResetPasswordType = {
  emailOrPhone: string;
};

interface User {
  name: string;
  phone?: string;
  email: string;
  password: string;
};

const users: User[] = [
  {name: 'Alice', email: 'alice@example.com', password: 'alice123', phone: '9999999999'},
  {name: 'Bob', email: 'bob@example.com', password: 'bob123', phone: '8888888888'},
  {name: 'Eve', email: 'eve@example.com', password: 'eve123', phone: '7777777777'},
]

export class UserController {
  constructor() {
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {type: 'object'},
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<User> {
    // ensuring the user exists, and the password is correct
    const foundUser = users.find(user =>
      user.password === credentials.password
      && (user.email === credentials.emailOrPhone || user.phone === credentials.emailOrPhone));

    if (!foundUser) {
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }
    return foundUser;
  }

  @post('/users/reset-password', {
    responses: {
      '204': {
        description: 'User reset password success',
      },
    },
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: {type: 'object'},
        },
      },
    })
      resetPassword: ResetPasswordType,
  ): Promise<void> {

    const foundUser = users.find(user =>
      user.email === resetPassword.emailOrPhone || user.phone === resetPassword.emailOrPhone);

    if (!foundUser) {
      throw new HttpErrors.Unauthorized('No user found with given email or phone');
    }

    // send reset instruction to found user.
  }
}
