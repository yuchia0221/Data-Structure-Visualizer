import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/DS_Visualizer/mainMenuStyle.scss'

const useStyles = makeStyles({
	root: {
	  maxWidth: 345,
	  margin:15
	},
	media: {
	  height: 140,
	  

	},
  });

function Menu(props) {
	  const classes = useStyles();
	return (

		<div className = 'main-menu'>
			<Card className={classes.root} id='stack'>
				<CardActionArea onClick={() => props.selector('stack')}>
					<CardMedia
					className={classes.media}
					image="https://miro.medium.com/max/3840/1*PkkAZnW-qb8B8XRYTbzLig.jpeg"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Stack
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Stack is one of the famous data structures, it can push and pop elements from the top.
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/stack-data-structure/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>

				</CardActions>
			</Card>
			<Card className={classes.root} id='queue'>
				<CardActionArea onClick={() => props.selector('queue')}>
					<CardMedia
					className={classes.media}
					image="https://benoitpasquier.com/images/2020/03/queue-data-structure.png"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Queue
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Queue is like stack, but it can enqueue to the rear and dequeue from the front.
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/queue-data-structure/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>

				</CardActions>
			</Card>
			<Card className={classes.root} id='bst' onClick={() => props.selector('bst')}>
				<CardActionArea>
					<CardMedia
					className={classes.media}
					image="https://i.imgur.com/0jMBpQM.png"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Binary Search Tree
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
					Binary Search Tree is a special type of binary tree that has a specific order of elements in it.
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/binary-search-tree-data-structure/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>
				</CardActions>
			</Card>
			<Card className={classes.root} id='avl'>
				<CardActionArea onClick={() => props.selector('avl')}>
					<CardMedia
					className={classes.media}
					image="https://i.stack.imgur.com/sKN01.png"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						AVL Tree
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
					AVL trees are height-balanced binary search trees and always search a node in O(logn) time.
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/avl-tree-set-1-insertion/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>
				</CardActions>
			</Card>
			<Card className={classes.root} id='maxh'>
				<CardActionArea onClick={() => props.selector('maxheap')}>
					<CardMedia
					className={classes.media}
					image="https://static.coderbridge.com/img/techbridge/images/huli/sorting/heap.jpg"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Max Heap
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
					 A max heap is a heap that the number of parent nodes must be bigger than the child nodes. 
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/max-heap-in-java/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>
				</CardActions>
			</Card>
			<Card className={classes.root} id='minh'>
				<CardActionArea onClick={() => props.selector('minheap')}>
					<CardMedia
					className={classes.media}
					image="https://visualgo.net/img/png/heap.png"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Min Heap
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
					 A min heap is a heap that the number of parent nodes must be smaller than the child nodes. 
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/min-heap-in-java/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>
				</CardActions>
			</Card>
			<Card className={classes.root} id='rbtree'>
				<CardActionArea onClick={() => props.selector('redb')}>
					<CardMedia
					className={classes.media}
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYHIieZWVCAd44cA4ExtaiAHqAnAwectNy3Q&usqp=CAU"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Red Black tree
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
					A red-black tree is a kind of self-balancing binary search tree where each node has an extra bit.
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>
				</CardActions>
			</Card>
			<Card className={classes.root} id='trie'>
				<CardActionArea onClick={() => props.selector('trie')}>
					<CardMedia
					className={classes.media}
					image="https://koenig-media.raywenderlich.com/uploads/2016/10/SwiftAlgClub_TrieData-feature.png"
					title="Visualize it!"
					
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						Trie
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
					A Trie is an extremely special and useful data-structure that are based on the prefix of a string.
					</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions className='actions'>
					<a className='learn'
						href="https://www.geeksforgeeks.org/trie-insert-and-search/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button size="small" color="primary" >
							Learn More
						</Button>
					</a>
				</CardActions>
			</Card>
			
		</div>
	)
}

export default Menu
