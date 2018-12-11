import React, { Component } from 'react';
import Link from 'next/link';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Link href="/en-ca/login-page">
          <a>Login</a>
        </Link>
      </div>
    );
  }
}
