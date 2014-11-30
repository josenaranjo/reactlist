/**
* @jsx React.DOM
*/
// The above declaration must remain intact at the top of the script.

var ReactPropTypes = React.PropTypes; 
        
var ItemListBox = React.createClass({
  
  append: function(items) {
    var tempData = this.props.data;
    tempData.push(items);   
    this.setState({data: tempData});
  },

  getList: function() {
    return this.props.data; 
  },

  getInitialState: function() {
    return {data: []};
  },
	
	cleanState: function() {
		this.setState({data: []});
	},

  render: function() {
    return (
      <ul className='react-list-container list-group'>
        <ItemList data={this.props.data} />
      </ul>
    );
  }
});

var ItemList = React.createClass({
  
  _deleteItemHandler: function(item) {
    var itemList = this.props.data;
    itemList.splice(itemList.indexOf(item), 1);
    this.setState({data: itemList});
  },
  
  render: function() {
    var _this = this;
    var listNodes = this.props.data.map(function (item) {
      return <ItemLi onDelete={_this._deleteItemHandler} data={item} />
    });
    
    return (
      <span>
        {listNodes}
      </span>
    );
  }
});
    
var ItemLi = React.createClass({
  
  propTypes: {
    onDelete: ReactPropTypes.func.isRequired
  },
  
  _deleteFunc: function() {
    this.props.onDelete(this.props.data);
  },
  
  render: function() {
    return (
      <li className="react-list-item list-group-item">{this.props.data} <a onClick={this._deleteFunc} className="glyphicon glyphicon-remove"></a></li>
    );
  }
});