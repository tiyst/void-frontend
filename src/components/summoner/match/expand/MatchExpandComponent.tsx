import './MatchExpandComponent.scss';
import { BaseBlockProps } from '../../../base/Base.tsx';
import { Match } from '../../../../model/Match.ts';
import { ExpandParticipantFragment } from './ExpandParticipantFragment.tsx';
import { getTeams } from '../../../../utils/MatchUtils.ts';

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

	const teams = getTeams(data.match.participants);

	return (
		<div className="match-expand-wrapper">
			{teams.map((team, teamIndex) => (
				<div
					key={team.length > 0 ? `team-${team[0].teamId}` : `empty-team-${teamIndex}`}
					className="expanded-team-section"
				>
					{team.map((participant) => (
						<ExpandParticipantFragment
							key={`${participant.riotIdGameName}`}
							participant={participant}
							isMainPlayer={data.playerName === participant.riotIdGameName}
							highestTotalDamage={highestDamage}
							server={data.server}
						/>
					))}
				</div>
			))}
		</div>
	);
};
