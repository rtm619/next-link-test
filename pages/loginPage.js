import React, { Component } from 'react';

import Link from 'next/link';

export default class LoginPage extends Component {
  render() {
    return (
      <Link href="/en-ca">
        <a>Home</a>
      </Link>
    );
  }
}
