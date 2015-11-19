'use strict';

// eslint-disable-line disable-file

import React from 'react';

export default class NewsItem extends React.Component {
  render() {
    return (
      <div className={['news-item'].concat(this.props.zebra).join(' ')} >
        <div className="title" >{this.props.title}</div>
        <div className="lead" >
          {this.props.image &&
          <img alt={this.props.title} className='image' src={`data:image/png;base64,${this.props.image}`} />
          }
          {this.props.lead}
        </div>
        <a className="link" href={`#${this.props.link}`} >Læs mere</a>
      </div>
    );
  }
}

NewsItem.displayName = 'NewsItem';
NewsItem.propTypes = {
  body: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  zebra: React.PropTypes.string.isRequired
};
