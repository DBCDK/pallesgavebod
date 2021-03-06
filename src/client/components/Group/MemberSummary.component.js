'use strict';

/**
 * @file Write a short description here.
 */

import React, {PropTypes} from 'react';

class MemberSummary extends React.Component {

  constructor() {
    super();
  }

  render() {
    const memberCount = this.props.members.length;
    return (
      <div className='row group--member-summary'>
        <ul className='group--member-horizontal-list small-20'>
          {this.props.members.map(function(member) {
            return <li key={member.id}><img alt={member.email} className='small-2 group--member-image' src={member.imageUrl || '/dummy.jpg'}></img></li>;
          })}
        </ul>
        <span className='group--member-counter small-4'>{memberCount} medlemmer</span>
      </div>
    );
  }
}

MemberSummary.displayName = 'MemberSummary.component';
MemberSummary.propTypes = {
  members: PropTypes.array.isRequired
};

export default MemberSummary;
