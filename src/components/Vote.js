import React from 'react';

const PairItem = ({ entry, vote, isDisabled, hasVoted }) => {
	return (
		<button key={entry}
				onClick={() => vote(entry)}
				disabled={isDisabled ? 'disabled' : null }
			>
			<h1>{entry + (hasVoted ? ' - Voted' : '') }</h1>
		</button>
	);
};


const Vote = ({ pair = [], vote, hasVoted }) => {
	const isDisabled = () => !!hasVoted;
	const pairElements = pair.map(
						(entry) => {

							return (<PairItem 	key={entry}
												isDisabled={isDisabled()}
									  			vote={vote}  
									 	 		entry={entry}
									 	 		hasVoted={hasVoted === entry} />);
						});
	return (
		<div>
			<div className="voting">
				{ pairElements }
			</div>
		</div>
	);
};

export default Vote;