import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

class ShoppingList extends Component {
	componentDidMount() {
		this.props.getItems();
	}

	handleClickDelete = (id) => {
		this.props.deleteItem(id);
	}

	render() {
		const { items, isLoading } = this.props.item;

		return (
			<Container>
			{isLoading === true ?
				<MDSpinner className="spinner" size={50} /> :
				<ListGroup>
					<TransitionGroup className="shopping-list">
						{items.map(({ name, _id }) => (
							<CSSTransition key={_id} timeout={500} classNames="fade">
								<ListGroupItem>
									<Button 
										style={{marginRight: 10}}
										className="remove-btn"
										color="danger"
										size="sm"
										onClick={() => this.handleClickDelete(_id)}
									>&times; </Button>
									 {name}
								</ListGroupItem>
							</CSSTransition>
						))}
					</TransitionGroup>
				</ListGroup>
			}
			</Container>
		);
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ 
	item: state.item 
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);