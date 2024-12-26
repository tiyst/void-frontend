import {Rank} from "../../../model/Summoner.ts";
import BaseWithHeader from "../../base/withHeader/BaseWithHeader.tsx";
import RankFragment from "./RankFragment.tsx";
import {BaseBlockProps} from "../../base/Base.tsx";
import "./RankComponent.scss"

type RankComponentProps = BaseBlockProps & {
	ranks: Rank[];
};

const RankComponent: React.FC<RankComponentProps> = (data: RankComponentProps) => {
	const {className = ''} = data;
	return (
		<BaseWithHeader headerText="ranks" className={`rankComponent ${className}`}>
			{data.ranks.map((rank) => <RankFragment key={rank.id} {...rank}/>)}
		</BaseWithHeader>
	)
}

export default RankComponent;