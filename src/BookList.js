import React, { Component } from "react";

import BookTable from "./BookTable";
import SearchBar from "./SearchBar";

export default class BookList extends Component {
	state = {
		booksFiltered: this.props.books,
		filterByColor: false
	};
	filterBooks = query => {
		query = query.toLowerCase();
		let filteredBooks = this.props.books.filter(book =>
			`${book.title}`.toLowerCase().includes(query)
		);
		this.setState({ booksFiltered: filteredBooks });
	};

	filterByColor = clr => {
		let filteredBooks = this.props.books.filter(book => book.color === clr);

		console.log("color", clr);
		console.log("filteredBooks: ", filteredBooks);
		this.setState({ 
			booksFiltered: filteredBooks,
			filterByColor: true,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		console.log(
			"componentDidUpdate | prevState: ",
			prevState.booksFiltered
		);

		console.log(
			"componentDidUpdate | current State: ",
			this.state.booksFiltered
		);

		console.log(
			"componentDidUpdate | prev props/ match: ",
			prevProps.match.isExact
		);

		console.log(
			"componentDidUpdate | current props/ match: ",
			this.props.match.isExact
		);

		console.log(
			"componentDidUpdate | filter by color flag: ",
			this.state.filterByColor
		);


		if (prevProps.match.isExact !== this.props.match.isExact) 
		{	
			if (this.props.match.isExact) 
			{
				this.setState({
				 booksFiltered: this.props.books,
				 filterByColor: false
				});	
			}
			
		}
	}

	componentDidMount() {
		console.log("========BookList componentDidMount")		
	}

	render() {

		console.log("this.props.match.params.color =>", this.props.match.params.color)
		const clr = this.props.match.params.color
		// if (!clr) {
		// 		this.setState({ 
		// 		booksFiltered: this.props.books,
		// 		filterByColor: false,
		// 	});
		// }
		const books = this.state.booksFiltered;
		const isExact = this.props.match.isExact
		console.log(
			"this.props.match.isExact: ",
			this.props.match.isExact
		);




		return (
			<div>
				<h3>Books</h3>
				<SearchBar onChange={this.filterBooks} />
				<BookTable books={books} onClick={this.filterByColor} />
			</div>
		);
	}
}
