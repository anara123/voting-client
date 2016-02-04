import { assert } from 'chai';
import { List, Map, fromJS } from 'immutable';

import reducer from '../src/reducer';
import { SET_STATE, VOTE } from '../src/constants'; 

describe('reducer', function () {
	
	it('handles SET_STATE with plain JS payload', function () {
		const beforeState = Map();
		const action = { 
			type: SET_STATE, 
			state: {
				vote: {
					pair: ['Terminator', 'Mongo'],
					tally: {
						'Terminator': 3,
						'Mongo': 2
					}
				}
			} 
		};
		
		const afterState = Map({
			vote: Map({
				pair: List.of('Terminator', 'Mongo'),
				tally: Map({
					'Terminator': 3,
					'Mongo': 2
				})
			})
		});

		assert.equal(
			reducer(beforeState, action),
			afterState);
	});


	it('handles SET_STATE without initial state', function() {
		const beforeState = undefined;
		const action = { 
			type: SET_STATE, 
			state: {
				vote: {
					pair: ['Terminator', 'Mongo'],
					tally: {
						'Terminator': 3
					}
				}
			} 
		};
		
		const afterState = Map({
			vote: Map({
				pair: List.of('Terminator', 'Mongo'),
				tally: Map({
					'Terminator': 3
				})
			})
		});

		assert.equal(
			reducer(beforeState, action),
			afterState);
	});


	it('handles VOTE by setting hasVoted', function() {

		const beforeState = fromJS({
			vote: {
				pair: ['Terminator', 'Mongo'],
				tally: { 'Terminator': 1 }
			}

		});
		const action = { type: VOTE, entry: 'Terminator' };

		const afterState = fromJS({
			vote: {
				pair: ['Terminator', 'Mongo'],
				tally: { 'Terminator': 1 }
			},
			hasVoted: 'Terminator'
		});

		assert.equal(
			reducer(beforeState, action),
			afterState);

	});

	it('doesn\'t set hasVoted for VOTE on invalid input', function() {
		const beforeState = fromJS({
			vote: {
				pair: ['Terminator', 'Mongo'],
				tally: { 'Terminator': 1 }
			}

		});
		const action = { type: VOTE, entry: 'Koko' };

		const afterState = beforeState; // doesn't change  

		assert.equal(
			reducer(beforeState, action),
			afterState);
	});

	it('removes hasVoted on SET_STATE if pair changes', function() {
		const action = { 
			type: SET_STATE, 
			state: fromJS({
				vote: {
					pair: ['Momo', 'Lolo']	
				}
			})
		};
		const beforeState = fromJS({
			vote: {
				pair: ['Terminator', 'Mongo'],
				tally: { 'Terminator': 1 }
			},
			hasVoted: 'Terminator'
		});

		const afterState = fromJS({
			vote: {
				pair: ['Momo', 'Lolo']	
			}
		});

		assert.equal(
			reducer(beforeState, action),
			afterState);
	});
});

