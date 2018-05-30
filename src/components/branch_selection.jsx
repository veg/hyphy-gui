import React, { Component }  from 'react';


// Placeholder component
class BranchSelection extends React.Component {

  render() {
    return (
      <div>
        <h3>BranchSelection Component Placeholder</h3>
      </div>
    );
  }
}


// BranchSelection component from datamonkey-js (the component isn't currently in use on datamonkey but will be re-purposed for the GUI)
/*
class BranchSelection extends React.Component {

  constructor(props) {

    super(props);

    // todo : check if multiple partitions available
    // todo : hide user button if not available
    // todo : if multiple partitions, we will not be able to select partitions

    // set up the tree component
    var tree_container = '#tree-body';

    var tree = d3.layout.phylotree(tree_container)
        .size([this.props.height, this.props.width])
        .separation (function (a,b) {return 0;})
        .count_handler (function (count) { 
                $("#selected_branch_counter").text(function (d) { return count[current_selection_name]; }); 
                $("#selected_filtered_counter").text(count.tag);
            }
        );


    this.state = {
      tagged_branches : false,
      current_selection_name : "nwk",
      selected_tree : this.props.trees.user_supplied || this.props.trees.neighbor_joining,
      tree : tree
    };

  }

  createNeighborTree(nwk) {

    var default_tree_settings = function(tree) {
        tree.branch_length (null);
        tree.branch_name (null);
        tree.node_span ('equal');
        tree.options ({'draw-size-bubbles' : false}, false);
        tree.options({'left-right-spacing' : 'fit-to-size'});
        tree.options({'binary-selectable' : false});
    }

    var container_id = '#tree_container';

    // clear all svgs under container_id first
    d3.select(container_id).select("svg").remove();

    var svg = d3.select(container_id).append("svg")
        .attr("width", this.props.width)
        .attr("height", this.props.height);

    default_tree_settings(this.state.tree);
    this.state.tree(this.state.selected_tree).svg(svg).layout();

    _.delay(this.state.tree.placenodes().update, 100);

  }

  toggleSelectedTree (e) {

    //createNeighborTree(user_tree_nwk);
    var elem = e.target;
    var new_tree = elem.dataset.tree;

    this.setState({
      selected_tree : new_tree
    });

  }

  setEvents() {

    var self = this;

    //todo : just set in render
    function sort_nodes(asc) {
      self.state.tree.traverse_and_compute (function (n) {
        var d = 1;
        if (n.children && n.children.length) {
            d += d3.max (n.children, function (d) { return d["count_depth"];});
        }
        n["count_depth"] = d;
      }); 

      self.state.tree.resort_children (function (a,b) {
          return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
      });
    }

    $("#sort_original").on ("click", function (e) {
      self.state.tree.resort_children (function (a,b) {
          return a["original_child_order"] - b["original_child_order"];
      });
    });

    $("#sort_ascending").on ("click", function (e) {
      sort_nodes(true);
    });

    $("#sort_descending").on ("click", function (e) {
      sort_nodes(false);
    });

    $("#and_label").on("click", function (e) {
      self.state.tree.internal_label (function (d) { return d.reduce (function (prev, curr) { return curr[current_selection_name] && prev; }, true)}, true);
    });

    $("#or_label").on("click", function (e) {
      self.state.tree.internal_label (function (d) { return d.reduce (function (prev, curr) { return curr[current_selection_name] || prev; }, false)}, true);
    });

    $("#filter_remove").on("click", function (e) {
      self.state.tree.modify_selection (function (d) { return !d.tag;});
    });

    $("#select_all").on("click", function (e) {
      self.state.tree.modify_selection(function (d) { return true;});
    });

    $("#select_all_internal").on("click", function (e) {
      self.state.tree.modify_selection(function (d) { return !d3.layout.phylotree.is_leafnode (d.target);});
    });

    $("#select_all_leaves").on("click", function (e) {
      self.state.tree.modify_selection(function (d) { return d3.layout.phylotree.is_leafnode (d.target);});
    });

    $("#select_none").on("click", function (e) {
      self.state.tree.modify_selection(function (d) { return false;});
    });

    $("#display_dengrogram").on("click", function (e) {
      self.state.tree.options({'branches' : 'step'}, true);
    });
       
    $("#expand_spacing").on("click", function (e) {
      self.state.tree.spacing_x(self.state.tree.spacing_x() + 1).update(true);
    });

    $("#compress_spacing").on ("click", function (e) {
      self.state.tree.spacing_x(self.state.tree.spacing_x() - 1).update(true);
    });

  }

  submit(e) {

    e.preventDefault();

    var self = this;

    var validate_selection = function(tree, callback) {
      if(tree.nodes.get_selection().length) {
        callback();
      } else {
        callback({ msg : 'No branch selections were made, please select one. Alternatively, you can choose to select all via the menu.'});
      }
    }

    var export_newick = function(tree) {

      return tree.get_newick (
        function (node) {
          var tags = [];
          if (node.selected) { tags.push("FG") };
          if (tags.length) {
            return '{' + tags.join (',') + '}';
          }
          return '';
        }
      )

    }

    validate_selection(tree, function(err) {

      if(err) {

        // TODO: replace this with a modal (formerly used datamonkey error modal)
        alert(err.msg);

      } else {

        var formData = new FormData();
        var nwk_tree = export_newick(tree);
        formData.append('nwk_tree', nwk_tree);

        var xhr = new XMLHttpRequest();
        xhr.open('post', self.attributes.getNamedItem("action").value, true);
        xhr.onload = function(res) {
          // Replace field with green text, name of file
          var result = JSON.parse(this.responseText);
          if('_id' in result.fel) {
            window.location.href =  '/fel/' + result.fel._id;
          } else if ('error' in result) {
          // TODO: replace this with a modal (formerly used datamonkey error modal)
            alert(result.error);
          }
        };

        xhr.send(formData);

      }
    });

  }

  partitionList () {

    var partitionOption = (partition) => {
      return(<li><a href="#" data-tree={partition.usertree} onClick={this.toggleSelectedTree.bind(this)} >Partition {partition.partition}</a></li>)
    }

    return _.map(this.props.trees.partition_info, partitionOption);

  }

  treeSelectBtnGroup () {

    if(this.props.trees.partition_info.length > 1) {

      // iterate over all partitions
      return(<div id="tree-select-btn-group" className="col-lg-6 phylo-nav">
        <div className="btn-group" data-toggle="buttons">

          <div className="btn-group">
            <button type="button" className="btn btn-default btn-sm" data-tree={this.props.trees.user_supplied} onClick={this.toggleSelectedTree.bind(this)}> User Defined Trees</button>
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="caret pull-left"></span>
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <ul className="dropdown-menu">
              {this.partitionList()}
            </ul>
          </div>

          <button type="button" title="Neighbor Joining Tree" id="dm-nj-highlighter" className="btn btn-default btn-sm"  data-tree={this.props.trees.neighbor_joining} onClick={this.toggleSelectedTree.bind(this)}>
            Neighbor Joining Tree
          </button>
        </div>
      </div>);

    } else if(this.props.trees.user_supplied) {

      return(<div id="tree-select-btn-group" className="col-lg-4 phylo-nav">

        <div className="btn-group" data-toggle="buttons">
          <label title="User Defined Tree" id="dm-usertree-highlighter" className="btn btn-default btn-sm active" data-tree={this.props.trees.user_supplied} onClick={this.toggleSelectedTree.bind(this)}>
            <input type="radio" name="options" id="dm-ut-select" autoComplete="off" ></input>
            User Defined Tree
          </label>
          <label title="Neighbor Joining Tree" id="dm-nj-highlighter" className="btn btn-default btn-sm" data-tree={this.props.trees.neighbor_joining} onClick={this.toggleSelectedTree.bind(this)}>
            <input type="radio" name="options" id="dm-nj-select" autoComplete="off" ></input>
            Neighbor Joining Tree
          </label>
        </div>
      </div>);

    } else {
      return;
    }

  }

  componentDidMount () {

    this.createNeighborTree(this.state.neighbor_tree);
    this.setEvents();

  }

  componentDidUpdate () {

    this.createNeighborTree(this.state.selected_tree);
    this.setEvents();

  }


  render() {

    return(<div>
    <div className="alert alert-warning">
      Your NEXUS file had multiple partitions! Selecting specific branches will not be permitted. 
      You will still be able to select from the following if you choose user defined trees:
      <ul>
        <li>All Nodes</li>
        <li>Only Internal Nodes</li>
        <li>Only Leaf Nodes</li>
      </ul>
    </div> 
    <div className="col-lg-6 phylo-nav">
      <div className="btn-group">
        <button title="Expand spacing" id="expand_spacing" className="btn btn-default btn-sm" type="button">
            <i className="fa fa-expand"></i>
        </button>
         <button title="Compress spacing" id="compress_spacing" className="btn btn-default btn-sm" type="button">
            <i className="fa fa-compress"></i>
        </button>
         <button title="Sort deepest clades to the bototm" id="sort_ascending" className="btn btn-default btn-sm" type="button">
            <i className="fa fa-sort-amount-asc"></i>
        </button>
         <button title="Sort deepsest clades to the top" id="sort_descending" className="btn btn-default btn-sm" type="button">
            <i className="fa fa-sort-amount-desc"></i>
        </button>
         <button title="Restore original order" id="sort_original" className="btn btn-default btn-sm" type="button">
            <i className="fa fa-sort"></i>
        </button>
        <button data-toggle="dropdown" className="btn btn-default btn-sm dropdown-toggle" type="button">Selection <span className="caret"></span></button>
            <ul className="dropdown-menu">
              <li><a id="select_all" href="#">Select all</a></li>
              <li><a id="select_all_internal" href="#">Select only internal nodes</a></li>
              <li><a id="select_all_leaves" href="#">Select only leaf nodes</a></li>
              <li><a id="select_none" href="#">Clear selection</a></li>
           </ul>
      </div>
   </div>

   {this.treeSelectBtnGroup.bind(this)()}

    <div id="neighbor-tree" data-tree="" data-usertree="">
      <div id="tree-body">
        <div id='tree_container' className='tree-widget'></div>
      </div>
    </div>

    <form action="/fel/<%= fel._id %>/select-foreground" encType="multipart/form-data" method="POST" name="modelForm">
      <div>
        <button type="submit" className="btn pull-right"><span className="glyphicon glyphicon-play dm-continue-btn"></span></button>
      </div>
    </form></div>)

  }

}

BranchSelection.defaultProps = {
}

function render_branch_selection(trees, post_to, element_id) {
  ReactDOM.render(
    <BranchSelection trees={trees} post_to={post_to} height={800} width={600} />, document.getElementById(element_id)
  );
}
*/

module.exports.BranchSelection = BranchSelection;
