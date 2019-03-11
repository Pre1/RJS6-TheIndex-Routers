import React, { Component } from "react";

import BookTable from "./BookTable";
import SearchBar from "./SearchBar";

export default class BookList extends Component {
	state = {
		booksFiltered: this.props.books,
		isFilteredByColor: false,
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
			isFilteredByColor: true,
		});
	};


	componentDidUpdate(prevProps, prevState) {
		const clr = this.props.match.params.color
		console.log("*****this.props.match.params.color =>", clr)
		
		console.log("*****prevProps.color =>", prevProps.color)
		
		
		if ((clr) && !this.state.isFilteredByColor) 
		{
			this.filterByColor(clr)

		} 
		// if there's no color
		else if (!clr && prevProps.match.params.color) {
			this.setState({
				booksFiltered: this.props.books,
				isFilteredByColor: false,
			})
		}


	}
	componentDidMount() {
		console.log("========BookList componentDidMount")
		console.log("isFilteredByColor: ", this.state.isFilteredByColor)

		const clr = this.props.match.params.color
		if (clr) {
			this.filterByColor(clr)
		}

	}

	render() {

		// if (clr) {
		// 	// 	this.setState({ 
		// 	// 	booksFiltered: this.props.books,
		// 	// });
		// 	this.filterByColor(clr)
		// }
		const books = this.state.booksFiltered;

		return (
			<div>
				<h3>Books</h3>
				<SearchBar onChange={this.filterBooks} />
				<BookTable books={books} />
			</div>
		);
	}
}
