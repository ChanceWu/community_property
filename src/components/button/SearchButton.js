import React from 'react'
import { Button, Input } from 'antd'

class SearchButton extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchValue: ''
		}
	}
	render() {
		return (
			<div>
				<Button
		          type="primary"
		          // onClick={() => this.handleSearch(selectedKeys, confirm)}
		          icon="search"
		          className="management_button management_button_right"
		        >
		          Search
		        </Button>
	    		<Input
		          placeholder="Search"
		          onChange={e => console.log(e)}
		          className="management_input"
		        />
			</div>
		)
	}
}

export default SearchButton