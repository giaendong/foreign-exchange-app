import React, { Component } from 'react';

export default class LoaderDots extends Component {
  render() {
    return (
      <div className='dot-container'>
        <div className='dot' />
        <div className='dot' />
        <div className='dot' />
        <div className='dot' />
        <div className='dot margin-0' />
      </div>
    );
  }
}