'use strict';

import Reflux from 'reflux';
import ResultListActions from '../actions/ResultList.action.js';
import CoverImageActions from '../actions/CoverImage.action.js';

// Setup dataobject for query
// @todo We may need to initialize it with data from the URL or an global object
let _store = {
  result: [],
  pending: false
};

/**
 * Store containing the current query of the page
 */
let ResultListStore = Reflux.createStore({

  // Initial setup by reflux
  init() {
    // Register statusUpdate action
    this.listenTo(ResultListActions.updated, this.update);
    this.listenTo(ResultListActions.pending, this.updatePending);
  },

  updatePending(state) {
    _store.pending = state;
    this.trigger(_store);
  },

  // update the query object and trigger an action
  update(result) {
    let resultList = result.result || [];
    this.callImageActions(resultList);
    _store.result = resultList;
    _store.pending = false;
    this.trigger(_store);
  },

  callImageActions(resultList) {
    resultList.forEach(result => CoverImageActions(result.identifiers));
  },

  // return the store data
  getStore() {
    return _store;
  }
});

export default ResultListStore;
