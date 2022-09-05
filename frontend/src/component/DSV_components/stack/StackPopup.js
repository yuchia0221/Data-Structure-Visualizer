import React from 'react'
import { Icon } from '@iconify/react';
import closeCircleF from '@iconify/icons-jam/close-circle-f';

function StackPopup(props) {
	return (
		<div className="popup">
			<div className="inner">
				<h1>Help</h1>
				<Icon
					className="icon"
					onClick={props.toggle}
					width="35px"
					height="35px"
					icon={closeCircleF}
				/>
				<div>
					<ul className='help-list'>
						<li>
							<button>Push</button> Push a number to the top
						</li>
						<li>
							<button>Pop</button> Pop and return a number from the top
						</li>
						<li>
							<button>Random</button> Push n random numbers
						</li>
						<li>
							<button>Clear</button> Removes all nodes
						</li>
					</ul>
					<a href='https://www.geeksforgeeks.org/stack-data-structure/' target='_blank' rel="noopener noreferrer">
					<button className='link-button'>Learn About Stack</button>

					</a>
				</div>
			</div>
		</div>
	)
}

export default StackPopup
