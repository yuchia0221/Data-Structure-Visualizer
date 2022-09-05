import React, { useState, useEffect } from 'react'
import Queuee from './DataStructure'
import QueueMenu from './QueueMenu'
import { Icon } from '@iconify/react'
import usePopup from '../../../hooks/usePopup'
import questionMarkCircleOutline from '@iconify/icons-eva/question-mark-circle-outline'
import '../../css/DS_Visualizer/ARRAYStyle.scss'
import QueuePopup from './QueuePopup'
function Queue(props) {
	const [queue, setQueue] = useState(null)
	const [queueHtml, setQueueHtml] = useState(null)
	const [popnum, setpopnum] = useState()
	const [popup, togglePopup] = usePopup()

	//Initializing Tree
	useEffect(() => {
		let tempQueue = new Queuee()
		setQueue(tempQueue)
		return () => {
			setQueue(null)
			setQueueHtml(null)
		}
	}, [])



	//Push Function
	const enqueue = val => {
		
		val = parseInt(val)
		if (!val) return
		let tempQueue = queue
		tempQueue.enqueue(val)
		setQueue(tempQueue)
		setQueueHtml(tempQueue.html)
		return val
	}
	//Pop element
	const dequeue = () => {
		let tempQueue = queue
		setpopnum(tempQueue.dequeue())
		setQueue(tempQueue)
		setQueueHtml(tempQueue.html)
	}

	//Generate Queue with random values
	const random = value => {
		value = parseInt(value)
		let tempQueue = new Queuee(value)
		setQueue(tempQueue)
		setQueueHtml(tempQueue.html)
	}


    return (
		<div>
			<header>
				<h1 className="heading">
					Queue
					<button className="i" onClick={togglePopup}>
					<Icon
							icon={questionMarkCircleOutline}
							width="25px"
							height="15px"
						/>
					</button>
				</h1>
				<button
					onClick={() => props.selector('menu')}
					className="main-menu-button"
				>
					Change Data Structure
				</button>
			</header>
			<QueueMenu
				insert={enqueue}
				remove={dequeue}
				random={random}

			/>
			<div className="array">
				<ul>{queueHtml}</ul>
			</div>
			<div className="traversal">
				{queue && queue.queue.length ? (
					<ul>
						{queue.pre > queue.top? ('Dequeue:'):('Enqueue:')}
						{queue.pre > queue.top? (popnum)
						:
						(<li>{queue.queue[queue.queue.length-1]}</li>)}

					</ul>
				) : (
					<p>Queue is Empty</p>
				)}
			</div>
			<div className="traversal ar">
				{queue && queue.queue.length ? (
					<ul>
						{'Front:'}
						{queue.queue[0]}
                        {' '}
						{'Rear:'}
						{queue.queue[queue.queue.length-1]}

					</ul>
                    
				) : (
					<p>Queue is Empty</p>
				)}
			</div>
			{popup ? <QueuePopup toggle={togglePopup} /> : null}
		</div>
	)
}

export default Queue