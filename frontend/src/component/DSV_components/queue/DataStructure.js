import React from 'react'





class Queuee{
	constructor(num = 0) {
		this.top = 0
		this.queue = []
		this.html = null
        this.pre = 0
		if (num) {
			this.generateRandomQueue(num)
		}
	}

	//Checks if queue is empty
	isEmpty() {
		return this.top === 0
	}

	//Push a value into the array
	enqueue(value) {
		this.queue[this.top] = value
		this.top++
        this.pre = this.top - 10
		this.html = this.updateHtml()
	}

	//Extracts the top value
	dequeue() {
		if (this.isEmpty()) return -111111
		let temp = this.queue[0]
        this.top--
        this.pre = this.top + 10
		this.queue.reverse()
        this.queue.pop()
        this.queue.reverse()
		this.html = this.updateHtml()

		return temp
	}
	//updates the whole html
	updateHtml(p = 0) {
		if (!this.top) return null

        return(
            <div>
            {this.queue.map((data,index) => (
                <li key = {index}>
                    <div className="normal">{data}</div>
                </li>
            ))}
            </div>
        )
    }

    //Inserts num random values
	generateRandomQueue(num) {
		let upper = 0
		let lower = num * 2 + 10
		let elements = new Set()
		for (let i = 0; i < num; i++) {
			let value =
				Math.floor(Math.random() * (upper - lower + 1)) + lower
			while (elements.has(value)) {
				value =
					Math.floor(Math.random() * (upper - lower + 1)) + lower
			}
			elements.add(value)
			this.enqueue(value)
		}
	}

}


export default Queuee
