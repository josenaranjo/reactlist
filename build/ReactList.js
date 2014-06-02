/**
* @jsx React.DOM
*/
// The above declaration must remain intact at the top of the script.

var ReactPropTypes = React.PropTypes; 
        
var ItemListBox = React.createClass({displayName: 'ItemListBox',
  
  append: function(items) {
    var tempData = this.props.data;
    for(var i = 0; i<items.length; i++) {
      tempData.push(items[i]);   
    }
    this.setState({data: tempData});
  },

  getList: function() {
    return this.props.data; 
  },

  getInitialState: function() {
    return {data: []};
  },

  render: function() {
    return (
      React.DOM.ul( {className:"react-list-container list-group"}, 
        ItemList( {data:this.props.data} )
      )
    );
  }
});

var ItemList = React.createClass({displayName: 'ItemList',
  
  _deleteItemHandler: function(item) {
    var itemList = this.props.data;
    itemList.splice(itemList.indexOf(item), 1);
    this.setState({data: itemList});
  },
  
  render: function() {
    var _this = this;
    var listNodes = this.props.data.map(function (item) {
      return ItemLi( {onDelete:_this._deleteItemHandler, data:item} )
    });
    
    return (
      React.DOM.span(null, 
        listNodes
      )
    );
  }
});
    
var ItemLi = React.createClass({displayName: 'ItemLi',
  
  propTypes: {
    onDelete: ReactPropTypes.func.isRequired
  },
  
  _deleteFunc: function() {
    this.props.onDelete(this.props.data);
  },
  
  render: function() {
    return (
      React.DOM.li( {className:"react-list-item list-group-item", key:"{this.props.data.id}"}, this.props.data.name, " ", React.DOM.a( {onClick:this._deleteFunc, className:"glyphicon glyphicon-remove"}))
    );
  }
});