'use strict';
/**
 * @file
 * Container for showing default recommendations
 */

import React from 'react';

// Actions
import RecommendationActions from './Recommendations.action';

// Stores
import ProfileStore from '../../stores/Profile.store';
import RecommendationStore from './Recommendations.store';

// Components
import SearchResultList from '../searchresult/SearchResultList.component';

/**
 * Renders a container for Recommendations
 */
class RecommendationContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      recommendations: {
        result: [],
        pending: false,
        info: {more: false}
      },
      result: []
    };
  }

  componentDidMount() {
    this.unsubscribe = [
      ProfileStore.listen(() => this.gotProfile()),
      RecommendationStore.listen(() => this.gotRecommendations())
    ];
  }

  componentWillUnmount() {
    this.unsubscribe.forEach(
      (unsubscriber) => {
        unsubscriber();
      }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state.result) !== JSON.stringify(nextState.result);
  }

  gotProfile() {
    const profileLikes = ProfileStore.store.likes;
    this.requestRecommendations(profileLikes);
  }

  requestRecommendations(profileLikes) {
    let likes = [];
    let dislikes = [];

    profileLikes.forEach((like) => {
      if (like.value === '1') {
        likes.push(like.item_id);
      }
      else {
        dislikes.push(like.item_id);
      }
    });

    RecommendationActions.request({likes: likes, dislikes: dislikes});
  }

  gotRecommendations() {
    this.setState({recommendations: RecommendationStore.store, result: RecommendationStore.store.result});
  }

  render() {
    return (
      <SearchResultList data={{results: this.state.recommendations}} />
    );
  }
}

RecommendationContainer.displayName = 'RecommendationContainer';

export default RecommendationContainer;
