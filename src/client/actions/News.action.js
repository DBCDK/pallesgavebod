'use strict';

/**
 * @file
 * Profile Actions
 */

import Reflux from 'reflux';
import SocketClient from 'dbc-node-serviceprovider-socketclient';

const getNewsList = SocketClient('getNewsList');

const NewsActions = Reflux.createActions([
  'fetchNewsList',
  'updateNewsList'
]);

NewsActions.getNewsList.listen(getNewsList.request);
saveEvent.response(NewsActions.updateNewsList);

export default NewsActions;
