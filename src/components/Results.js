import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionCreators from '../action-creators';

import Winner from './Winner';

export const Results = React.createClass({

	mixins: [PureRenderMixin],

	render: function() {
		const { pair = [], next, winner } = this.props;
		return (
			winner ? 
			
			<Winner winner={winner} /> :

			<div className="results">
				<div className="tally">
					{pair.map(entry => 

						<div key={entry} className="entry">
							<h1>{entry}</h1>
							<div className="voteCount">
								{this.getVoteCount(entry)}
							</div>
						</div>
					)}
				</div>
				<div className="management">
					<button ref="next" 
							className="btn-next"  
							onClick={next} >
						Next
					</button>
				</div>
			</div>
			
		);
	},

	getVoteCount: function(entry) {
		const { tally } = this.props;

		if (tally && tally.has(entry)) {
			return tally.get(entry);
		}
		else {
			return 0;
		}
	}
});

function mapStateToProps(state) {
	return {
		pair: state.getIn(['vote', 'pair']),
		tally: state.getIn(['vote', 'tally']),
		winner: state.get('winner')
	};
}


export const ResultsContainer = connect(
	mapStateToProps,
	actionCreators
)(Results);	
