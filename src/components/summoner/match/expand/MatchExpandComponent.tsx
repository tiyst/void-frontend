import './MatchExpandComponent.scss';
import { BaseBlockProps } from '../../../base/Base.tsx';
import { Match } from '../../../../model/Match.ts';
import { ExpandParticipantFragment } from './ExpandParticipantFragment.tsx';

export type MatchExpandProps = BaseBlockProps & {
	playerName: string;
	match: Match;
};

export const MatchExpandComponent = (data: MatchExpandProps) => {

	return (
		<div className="match-expand-wrapper">
			{data.match.participants.map((participant, index) => (
				<ExpandParticipantFragment key={participant.riotIdGameName + index} participant={participant} />
			))}
		</div>
	);
};