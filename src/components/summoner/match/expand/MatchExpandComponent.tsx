import './MatchExpandComponent.scss';
import { BaseBlockProps } from '../../../base/Base.tsx';
import { Match } from '../../../../model/Match.ts';
import { ExpandParticipantFragment } from './ExpandParticipantFragment.tsx';
import { sortParticipantsByTeam } from '../../../../utils/MatchUtils.ts';

export type MatchExpandProps = BaseBlockProps & {
	playerName: string;
	match: Match;
};

// TODO animation doesn't work
export const MatchExpandComponent = (data: MatchExpandProps) => {
	const highestDamage = data.match.participants.reduce((max, current) => {
		return current.totalDamageDealtToChampions > max.totalDamageDealtToChampions
			? current
			: max;
	}).totalDamageDealtToChampions;

	const participants = sortParticipantsByTeam(data.match.participants); // ordered due to arena scrambling subteams

	return (
		<div className="match-expand-wrapper">
			{participants.map((participant, index) => (
				<ExpandParticipantFragment key={participant.riotIdGameName + index}
										   participant={participant}
										   highestTotalDamage={highestDamage} />
			))}
		</div>
	);
};