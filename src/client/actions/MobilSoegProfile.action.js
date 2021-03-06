'use strict';

/**
 * @File
 * TODO some description
 */

import Reflux from 'reflux';
import SocketClient from 'dbc-node-serviceprovider-socketclient';

const fetchMobilSoegProfile = SocketClient('findMobilSoegProfile');
const isLoggedIn = SocketClient('isMobilSoegUserLoggedIn');
const saveLikeToMobilSoegProfile = SocketClient('saveLikeToMobilSoegProfile');

let MobilSoegProfileActions = Reflux.createActions([
  'isLoggedIn', // Checks if the user is logged in and returns true/false based on that
  'isLoggedInResponse',
  'fetchMobilSoegProfile',
  'fetchMobilSoegProfileResponse',
  'saveLikeToMobilSoegProfile',
  'likeObject',
  'dislikeObject',
  'likeSaved',
  'dislikeObject'
]);

MobilSoegProfileActions.isLoggedIn.listen(isLoggedIn.request);
isLoggedIn.response(MobilSoegProfileActions.isLoggedInResponse);

MobilSoegProfileActions.fetchMobilSoegProfile.listen(fetchMobilSoegProfile.request);
fetchMobilSoegProfile.response(MobilSoegProfileActions.fetchMobilSoegProfileResponse);

MobilSoegProfileActions.saveLikeToMobilSoegProfile.listen(saveLikeToMobilSoegProfile.request);
saveLikeToMobilSoegProfile.response(MobilSoegProfileActions.likeSaved);

export default MobilSoegProfileActions;
