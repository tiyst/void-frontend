import './MatchExpandComponent.scss';
import {BaseBlockProps} from '../../../base/Base.tsx';
import {Match} from '../../../../model/Match.ts';
import {ExpandParticipantFragment} from './ExpandParticipantFragment.tsx';

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

	// Participants are ordered here due to arena scrambling subteams
	const participants = [...data.match.participants].sort((a, b) => {
		if (a.playerSubteamId === 0 && b.teamId === 0) {
			return b.teamId - a.teamId;
		}
		if (a.playerSubteamId === 0) return 1;
		if (b.playerSubteamId === 0) return -1;
		return b.playerSubteamId - a.playerSubteamId;
	});

	return (
		<div className="match-expand-wrapper">
			{participants.map((participant, index) => (
				<ExpandParticipantFragment key={participant.riotIdGameName + index}
										   participant={participant}
										   highestTotalDamage={highestDamage}/>
			))}
		</div>
	);
};