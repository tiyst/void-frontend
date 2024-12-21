import TopBar from '../../components/topbar/TopBar.tsx';
import Base from '../../components/base/Base.tsx';
import { useState } from 'react';

function Homescreen() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<TopBar />
			<Base>
				<p>This is test in base</p>
			</Base>
			<button>Move to summoner screen</button>
			<div className="card">
				<button onClick={() => setCount((count) => count + 2)}>count is {count}</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
		</div>
	);
}

export default Homescreen;
