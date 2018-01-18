import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import { observable, computed, action } from 'mobx';

@inject(['listStore'])
@observer
class SearchMenu extends Component {
  @action
  handleSearch = e => {
    // console.log('e.target.value', e.target.value);
    // console.log('this.props.listStore', this.props.listStore);
    if (e.keyCode === 13) {
      console.log(e.keyCode);
      this.props.listStore.queryNodes(this.props.listStore.searchItem);
    }
  };

  @action
  handleChange = e => {
    console.log('e.target.value', e.target.value);

    this.props.listStore.searchItem = e.target.value;
  };

  render() {
    return (
      <Menu.Item>
        <Input
          icon="search"
          placeholder="Search..."
          value={this.props.listStore.searchItem}
          onKeyDown={this.handleSearch}
          onChange={this.handleChange}
        />
      </Menu.Item>
    );
  }
}

export default SearchMenu;
