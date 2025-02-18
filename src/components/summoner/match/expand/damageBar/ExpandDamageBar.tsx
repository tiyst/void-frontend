import './ExpandDamageBar.scss';
import { Participant } from '../../../../../model/Match.ts';
import { createDamageSegmentsForParticipant } from '../../../../../utils/MatchUtils.ts';

export type ExpandDamageBarProps = {
	participant: Participant;
	max: number;
}

export type DamageSegment = {
	dmg: number;
	color: string;
}

export const ExpandDamageBar = (data: ExpandDamageBarProps) => {
	const damageSegments = createDamageSegmentsForParticipant(data.participant);

	console.log(damageSegments);

	return (
		<div className="progress-bar-container">
			{damageSegments.map((segment, index) => (
				<div
					key={segment.dmg + index}
					className="progress-bar-segment"
					style={{
						width: `${(segment.dmg/data.max) * 100}%`,
						backgroundColor: segment.color,
					}}
				/>
			))}
		</div>
	);
};

