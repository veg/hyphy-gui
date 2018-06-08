import React, { Component } from "react";

class BranchSelection extends React.Component {
  constructor(props) {
    super(props);
    // TODO : check if multiple partitions available
    // TODO : hide user button if not available
    // TODO : if multiple partitions, we will not be able to select partitions
    // TODO : allow selection of test and reference branches, for RELAX.

    // set up the phylotree object.
    var tree_container = "#tree-body";
    var phylotreeObject = d3.layout
      .phylotree(tree_container)
      .size([this.props.height, this.props.width])
      .separation(function(a, b) {
        return 0;
      })
      .count_handler(function(count) {
        $("#selected_branch_counter").text(function(d) {
          return count[current_selection_name];
        });
        $("#selected_filtered_counter").text(count.tag);
      });

    // Evaluate what was passed in as props.tree and modify it to be an object with the proper key(s).
    var multipleTrees = false;
    if (
      typeof this.props.tree == "object" &&
      Object.keys(this.props.tree).length > 1
    ) {
      var nwkTrees = this.props.tree;
      multipleTrees = true;
    } else if (
      typeof this.props.tree == "object" &&
      Object.keys(this.props.tree).length < 1
    ) {
      var nwkTrees = this.props.tree;
    } else if (typeof this.props.tree == "string") {
      var nwkTrees = { user_supplied: this.props.tree };
    } else {
      throw "Unexpected tree type (expected either a string or an object)";
    }

    this.state = {
      current_selection_name: "nwk",
      treeType: "user_supplied",
      nwkTrees: nwkTrees,
      selectedTree: nwkTrees.user_supplied,
      tree: phylotreeObject,
      multipleTrees: multipleTrees
    };
  }

  componentDidMount() {
    this.createTree(this.state.selectedTree);
    this.setEvents();
  }

  componentDidUpdate() {
    this.createTree(this.state.selectedTree);
    this.setEvents();
  }

  createTree(nwk) {
    var default_tree_settings = function(tree) {
      tree.branch_length(null);
      tree.branch_name(null);
      tree.node_span("equal");
      tree.options({ "draw-size-bubbles": false }, false);
      tree.options({ "left-right-spacing": "fit-to-size" });
      tree.options({ "binary-selectable": false });
    };

    var container_id = "#tree_container";

    // clear all svgs under container_id first
    d3.select(container_id)
      .select("svg")
      .remove();

    var svg = d3
      .select(container_id)
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);

    default_tree_settings(this.state.tree);
    this.state
      .tree(this.state.selectedTree)
      .svg(svg)
      .layout();

    _.delay(this.state.tree.placenodes().update, 100);
  }

  toggleSelectedTree = treeType => {
    if (treeType != this.state.treeType) {
      this.setState({ treeType: treeType });
      this.setState({ selectedTree: this.state.nwkTrees[treeType] });
    }
  };

  setEvents() {
    var self = this;

    //todo : just set in render
    function sort_nodes(asc) {
      self.state.tree.traverse_and_compute(function(n) {
        var d = 1;
        if (n.children && n.children.length) {
          d += d3.max(n.children, function(d) {
            return d["count_depth"];
          });
        }
        n["count_depth"] = d;
      });

      self.state.tree.resort_children(function(a, b) {
        return (a["count_depth"] - b["count_depth"]) * (asc ? 1 : -1);
      });
    }

    $("#sort_original").on("click", function(e) {
      self.state.tree.resort_children(function(a, b) {
        return a["original_child_order"] - b["original_child_order"];
      });
    });

    $("#sort_ascending").on("click", function(e) {
      sort_nodes(true);
    });

    $("#sort_descending").on("click", function(e) {
      sort_nodes(false);
    });

    $("#and_label").on("click", function(e) {
      self.state.tree.internal_label(function(d) {
        return d.reduce(function(prev, curr) {
          return curr[current_selection_name] && prev;
        }, true);
      }, true);
    });

    $("#or_label").on("click", function(e) {
      self.state.tree.internal_label(function(d) {
        return d.reduce(function(prev, curr) {
          return curr[current_selection_name] || prev;
        }, false);
      }, true);
    });

    $("#filter_remove").on("click", function(e) {
      self.state.tree.modify_selection(function(d) {
        return !d.tag;
      });
    });

    $("#select_all").on("click", function(e) {
      self.state.tree.modify_selection(function(d) {
        return true;
      });
    });

    $("#select_all_internal").on("click", function(e) {
      self.state.tree.modify_selection(function(d) {
        return !d3.layout.phylotree.is_leafnode(d.target);
      });
    });

    $("#select_all_leaves").on("click", function(e) {
      self.state.tree.modify_selection(function(d) {
        return d3.layout.phylotree.is_leafnode(d.target);
      });
    });

    $("#select_none").on("click", function(e) {
      self.state.tree.modify_selection(function(d) {
        return false;
      });
    });

    $("#display_dengrogram").on("click", function(e) {
      self.state.tree.options({ branches: "step" }, true);
    });

    $("#expand_spacing").on("click", function(e) {
      self.state.tree.spacing_x(self.state.tree.spacing_x() + 1).update(true);
    });

    $("#compress_spacing").on("click", function(e) {
      self.state.tree.spacing_x(self.state.tree.spacing_x() - 1).update(true);
    });
  }

  submit(tree, callback) {
    function exportNewick(tree) {
      return tree.get_newick(function(node) {
        var tags = [];
        if (node.selected) {
          tags.push("FG");
        }
        if (tags.length) {
          return "{" + tags.join(",") + "}";
        }
        return "";
      });
    }

    function validate_selection(tree, callback) {
      var nwkToReturn = exportNewick(tree);
      if (tree.nodes.get_selection().length) {
        callback(nwkToReturn);
      } else {
        alert(
          "No branch selections were made, please select one. Alternatively, you can choose to select all via the menu."
        );
      }
    }

    validate_selection(tree, callback);
  }

  render() {
    return (
      <div>
        <div className="col-lg-6 phylo-nav">
          <div className="btn-group">
            <button
              title="Expand spacing"
              id="expand_spacing"
              className="btn btn-default btn-sm"
              type="button"
            >
              <i className="fa fa-expand" />
            </button>
            <button
              title="Compress spacing"
              id="compress_spacing"
              className="btn btn-default btn-sm"
              type="button"
            >
              <i className="fa fa-compress" />
            </button>
            <button
              title="Sort deepest clades to the bototm"
              id="sort_ascending"
              className="btn btn-default btn-sm"
              type="button"
            >
              <i className="fa fa-sort-amount-asc" />
            </button>
            <button
              title="Sort deepsest clades to the top"
              id="sort_descending"
              className="btn btn-default btn-sm"
              type="button"
            >
              <i className="fa fa-sort-amount-desc" />
            </button>
            <button
              title="Restore original order"
              id="sort_original"
              className="btn btn-default btn-sm"
              type="button"
            >
              <i className="fa fa-sort" />
            </button>
            <button
              data-toggle="dropdown"
              className="btn btn-default btn-sm dropdown-toggle"
              type="button"
            >
              Selection <span className="caret" />
            </button>
            <ul className="dropdown-menu">
              <li>
                <a id="select_all" href="#">
                  Select all
                </a>
              </li>
              <li>
                <a id="select_all_internal" href="#">
                  Select only internal nodes
                </a>
              </li>
              <li>
                <a id="select_all_leaves" href="#">
                  Select only leaf nodes
                </a>
              </li>
              <li>
                <a id="select_none" href="#">
                  Clear selection
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* If there are two trees render the tree selection buttons */}
        {this.state.multipleTrees ? (
          <TreeSelectBtnGroup
            tree={this.props.tree}
            selectedTree={this.state.selectedTree}
            toggleSelectedTree={this.toggleSelectedTree}
          />
        ) : null}

        <div id="tree-body">
          <div id="tree_container" className="tree-widget" />
        </div>

        <button
          onClick={() =>
            this.submit(this.state.tree, this.props.returnAnnotatedTreeCallback)
          }
        >
          Save Branch Selection
        </button>
      </div>
    );
  }
}

function TreeSelectBtnGroup(props) {
  return (
    <div id="tree-select-btn-group" className="col-lg-6 phylo-nav">
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label
          title="User Defined Tree"
          id="dm-usertree-highlighter"
          className="btn btn-sm btn-secondary active"
          onClick={() => props.toggleSelectedTree("user_supplied")}
        >
          <input
            type="radio"
            name="options"
            id="dm-ut-select"
            autoComplete="off"
          />
          User Defined Tree
        </label>
        <label
          title="Neighbor Joining Tree"
          id="dm-nj-highlighter"
          className="btn btn-sm btn-secondary"
          onClick={() => props.toggleSelectedTree("neighbor_joining")}
        >
          <input
            type="radio"
            name="options"
            id="dm-nj-select"
            autoComplete="off"
          />
          Neighbor Joining Tree
        </label>
      </div>
    </div>
  );
}

module.exports.BranchSelection = BranchSelection;
