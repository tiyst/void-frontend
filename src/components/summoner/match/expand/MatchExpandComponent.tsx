import './MatchExpandComponent.scss';
import { BaseBlockProps } from '../../../base/Base.tsx';
import { Match } from '../../../../model/Match.ts';
import { ExpandParticipantFragment } from './ExpandParticipantFragment.tsx';
import { sortParticipantsByTeam } from '../../../../utils/MatchUtils.ts';

export type MatchExpandProps = BaseBlockProps & {
	playerName: string;
	match: Match;
	server: string;
};

export const MatchExpandComponent = (data: MatchExpandProps) => {
	const highestDamage = data.match.participants.reduce(
		(max, current) => {
			return current.totalDamageDealtToChampions > max.totalDamageDealtToChampions ? current : max;
		},
		{ totalDamageDealtToChampions: -Infinity }
	).totalDamageDealtToChampions;

	const participants = sortParticipantsByTeam(data.match.participants); // ordered due to arena scrambling subteams

	return (
		<div className="match-expand-wrapper">
			{participants.map((participant, index) => (
				<ExpandParticipantFragment
					key={participant.riotIdGameName + index}
					participant={participant}
					isMainPlayer={data.playerName === participant.riotIdGameName} // Searching player has bold name
					highestTotalDamage={highestDamage}
					server={data.server}
				/>
			))}
		</div>
	);
};
