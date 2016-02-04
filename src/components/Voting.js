import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionCreators from '../action-creators';

import Vote from './Vote';
import Winner from './Winner';

export const Voting = React.createClass({

	mixins:[PureRenderMixin],

	render: function() {
		const { winner } = this.props;

		return ( 
			<div>
				{ winner ? 
					<Winner winner={winner}/> :
					<Vote { ...this.props }/>
				}
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	};
}

export const VotingContainer = connect(
	mapStateToProps, 
	actionCreators
)(Voting);

