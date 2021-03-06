'use strict';

import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';

class PostCreator extends React.Component {
  static displayName() {
    return 'PostCreator.component';
  }

  static propTypes() {
    return {
      onCreate: PropTypes.func.isRequired,
      toggleCreatePostCb: PropTypes.func.isRequired
    };
  }

  constructor() {
    super();

    this.toggleComponent = this.toggleComponent.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  createPost() {
    let content = ReactDom.findDOMNode(this.refs.postContent).value.trim();
    const post = {
      content: content
    };
    this.props.onCreate(post);
    this.props.toggleCreatePostCb();
  }

  toggleComponent() {
    this.props.toggleCreatePostCb();
  }

  render() {
    return (
      <div className='row'>
        <h4>Opret Indlæg</h4>
        <div className='small-24 medium-8 column'>
          <label>Indlæg</label>
          <textarea placeholder='Skriv dit indlæg her' ref="postContent"></textarea>
          <button onClick={this.toggleComponent}>Tilbage</button>
          <button onClick={this.createPost}>Opret</button>
        </div>
        <div className='hide-for-small-only medium-16'>
          <p></p>
        </div>
      </div>
    );
  }
}

export default PostCreator;
