import React from 'react';
import { List, Map } from 'immutable';

import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	findRenderedDOMComponentWithTag,
	
	scryRenderedDOMComponentsWithClass,
	findRenderedDOMComponentWithClass,

	Simulate
} from 'react-addons-test-utils';

import { expect } from 'chai';

import { Results } from '../../src/components/Results';

describe('Results', function () {
	
	it('should render two entris with vote count', function () {
		const pair = List.of('Terminator', 'Mongo');
		const tally = Map({
			'Terminator': 4
		});

		const component = renderIntoDocument(
			<Results pair={pair} 
					 tally={tally} />);

		const labels = scryRenderedDOMComponentsWithClass(component, 'entry');

		expect(labels.length).to.equal(2);
		expect(labels[0].textContent).contain('Terminator');
		expect(labels[0].textContent).contain('4');

		expect(labels[1].textContent).contain('Mongo');
		expect(labels[1].textContent).contain('0');
		
	});


	it('invokes the next callback when next button is clicked', function () {
		const pair = List.of('Terminator', 'Mongo');
		
		let nextInvoked = false;
		const next = () => nextInvoked = true;

		const component = renderIntoDocument(
			<Results pair={pair}
					 tally={Map()}
					 next={next} />);

		Simulate.click(component.refs.next);

		expect(nextInvoked).to.equal(true);
	});


	it('renders winner when there is one', function() {
		const component = renderIntoDocument(
			<Results winner='Terminator'
					 pair={['Terminator', 'Mongo']}
					 tally={Map()} />);

		const winner = findRenderedDOMComponentWithClass(component, 'winner');
		
		expect(winner).to.exist;
		expect(winner.textContent).contain('Terminator');
	});
});