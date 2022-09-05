import React from 'react'
import { Icon } from '@iconify/react';
import closeCircleF from '@iconify/icons-jam/close-circle-f';

function QueuePopup(props) {
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
							<button>Enqueue</button> Enqueue a number to the rear
						</li>
						<li>
							<button>Dequeue</button> Dequeue from the front
						</li>
						<li>
							<button>Random</button> Push n random numbers
						</li>
						<li>
							<button>Clear</button> Removes all nodes
						</li>
					</ul>
					<a href='https://www.geeksforgeeks.org/queue-data-structure/' target='_blank' rel="noopener noreferrer">
					<button className='link-button'>Learn About Queue</button>

					</a>
				</div>
			</div>
		</div>
	)
}

export default QueuePopup
