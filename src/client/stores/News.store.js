'use strict';

/**
 * @file
 * Profile Store
 */
import {findIndex} from 'lodash';

import Reflux from 'reflux';
import NewsActions from '../actions/News.action.js';

let newsStore = Reflux.createStore({

  store: {
    news: {
      items: [],
      haveBeenFetched: false,
      loading: false,
    }
  },

  init() {
    this.listenToMany(NewsActions);
    NewsActions.fetchNewsList({amount: 3});
  },

  getInitialState() {
    return this.store;
  },

  onfetchNewsList() {

  },
  onupdateNewsList() {

  },
});

export default newsStore;
