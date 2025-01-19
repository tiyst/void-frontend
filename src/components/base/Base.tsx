import React from 'react';
import './Base.scss';

export type BaseBlockProps = {
	children?: React.ReactNode;
	className?: string;
	playerName?: string;
};

const Base: React.FC<BaseBlockProps> = ({ children, className = '' }) => {
	return <div className={`base ${className}`}>{children}</div>;
};

export default Base;
