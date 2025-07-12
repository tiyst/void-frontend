import './Skeleton.scss';

import React from 'react';

interface SkeletonProps {
	width?: string;
	height?: string;
	borderRadius?: string;
	margin?: string;
	className?: string;
	backgroundColor?: string;
	border?: string;
	style?: React.CSSProperties;
}

export const Skeleton = ({
	width,
	height,
	borderRadius,
	margin,
	className,
	backgroundColor,
	border,
	style
}: SkeletonProps) => {
	return (
		<div
			className={`skeleton ${className ?? ''}`}
			style={{
				width: width ?? '100%',
				height: height ?? '100%',
				borderRadius: borderRadius ?? '8px',
				margin: margin ?? '2px',
				backgroundColor: backgroundColor ?? '',
				border: border ?? 'none',
				...style
			}}
		/>
	);
};
