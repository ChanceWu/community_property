import React from 'react'
import { Button, Input } from 'antd'
const Search = Input.Search

class SearchButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchValue: ''
		}
	}
	handleSearch = (value) => {
		console.log(value)
		this.props.handleSearch(value)
	}
	render() {
		return (
			<div>
				{/*<Button
		          type="primary"
		          // onClick={() => this.handleSearch(selectedKeys, confirm)}
		          icon="search"
		          className="management_button_right"
		        >
		          Search
		        </Button>
	    		<Input
		          placeholder="Search"
		          onChange={e => console.log(e.target.value)}
		          className="management_input"
		        />*/}
		        <Search
			      placeholder="搜索"
			      onSearch={value => this.handleSearch(value)}
			      className="management_input"
			    />
			</div>
		)
	}
}

export default SearchButton