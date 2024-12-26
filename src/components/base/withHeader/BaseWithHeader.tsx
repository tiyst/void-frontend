import Base, {BaseBlockProps} from "../Base.tsx";
import "./BaseWithHeader.scss"

export type BaseWithHeaderProps = BaseBlockProps & {
	headerText: string;
};

const BaseWithHeader: React.FC<BaseWithHeaderProps> = (data: BaseWithHeaderProps) => {

	return (
		<Base className={`baseWithHeader ${data.className}`}>
			<div className="baseHeader">
				<h3>{data.headerText}</h3>
			</div>
			{data.children}
		</Base>
	);
};

export default BaseWithHeader;