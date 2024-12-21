import React from 'react';
import './Base.scss';

type BaseBlockProps = {
	children: React.ReactNode;
	className?: string;
};

const Base: React.FC<BaseBlockProps> = ({ children, className = '' }) => {
	return <div className={`base ${className}`}>{children}</div>;
};

export default Base;
