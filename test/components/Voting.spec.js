import React from 'react';
import { List } from 'immutable';

import { 
	renderIntoDocument, 
	scryRenderedDOMComponentsWithTag, 
	findRenderedDOMComponentWithClass,
	Simulate } from 'react-addons-test-utils';

import { assert } from 'chai';

import { Voting } from '../../src/components/Voting';

describe('Voting', function () {

	it('should have two buttons', function () {
		
		const component = renderIntoDocument(
			<Voting pair={['Terminator', 'Mongo']} />);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		
		assert.equal(buttons.length, 2);
		assert.equal(buttons[0].textContent, 'Terminator');
		assert.equal(buttons[1].textContent, 'Mongo');

	});


	it('should invoke the click button callback', function () {
		let voteWith;
		const vote = (entry) => voteWith = entry;

		const component = renderIntoDocument(
			<Voting pair={['Terminator', 'Mongo']}
					vote={vote} />);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);

		assert.equal(voteWith, 'Terminator');
	});


	it('buttons should be disabled when hasVoted is true', function() {

		const component = renderIntoDocument(
			<Voting pair={['Terminator', 'Mongo']}
					hasVoted='Mongo' />);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		assert.equal(buttons.length, 2);

		assert.isTrue(buttons[0].hasAttribute('disabled'));
		assert.isTrue(buttons[1].hasAttribute('disabled'));
	});


	it('renders as a pure component', function () {
		const pair = ['Terminator', 'Mongo'];
		const component = renderIntoDocument(
			<Voting pair={pair} />);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		assert.equal(firstButton.textContent, 'Terminator');

		pair[0] = 'Good Days';
		component.setProps({pair: pair});
		
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		assert.equal(firstButton.textContent, 'Terminator');

	});	


	it.skip('does update DOM when prop changes', function() {
		const pair = List.of('Terminator', 'Mongo');
		const component = renderIntoDocument(
			<Voting pair={pair} />);

		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		assert.equal(firstButton.textContent, 'Terminator');

		const newPair = pair.set(0, 'Good Days');
		component.setProps({pair: newPair});
		
		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		assert.equal(firstButton.textContent, 'Good Days');
	});

	it ('adds label to the voted entry', function() {
		const component = renderIntoDocument(
			<Voting pair={['Terminator', 'Mongo']}
					hasVoted='Mongo' />);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		assert.include(buttons[1].textContent, 'Voted');
	});


	it('winner component should be rendered when winner is passed as a prop', function () {

		const component = renderIntoDocument(
			<Voting winner='Terminator'/>);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'buttons');
		assert.equal(buttons.length, 0);


		const winner = findRenderedDOMComponentWithClass(component, 'winner');
		assert.isNotNull(winner);
		assert.equal(winner.textContent, 'The winner is Terminator');
	});


});