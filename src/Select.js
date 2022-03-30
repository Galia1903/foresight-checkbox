import React from 'react';
import './App.css';


class Select extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                options: this.props.options,
                multiChoice: this.props.multiChoice,
                selected: [],
                searchString: '',
                changeSelectAllBtn: 'select all'
            }

            this.handleOnChange = this.handleOnChange.bind(this);
            this.handleSearchChange = this.handleSearchChange.bind(this);
            this.checkAll = this.checkAll.bind(this);
        }

        //checkbox change
        handleOnChange(e) {
            if (this.state.multiChoice === false) {
                this.uncheckOthers(e.target.id);
            }
            let selected = [];
            let elm = document.querySelectorAll('.check');
            for (let i = 0; i < elm.length; i++) {
                if (elm.item(i).type == "checkbox" && elm.item(i).checked === true) {
                    selected.push(elm.item(i).value);
                }
            }
            this.props.onSelect(selected);
        }


        uncheckOthers(id) {
            let elm = document.querySelectorAll('.check');
            for (let i = 0; i < elm.length; i++) {
                if (elm.item(i).type == "checkbox" && elm.item(i).id != id)
                    elm.item(i).checked = false;
            }
        }


        checkAll(e) {
            let elm = document.querySelectorAll('.check');
            for (let i = 0; i < elm.length; i++) {
                elm.item(i).checked = e.target.checked;
            }
            if (e.target.checked == true) {
                const allSelected = [];
                this.state.options.forEach(item => {
                    allSelected.push(item.value);
                })
                this.setState({
                    selected: allSelected,
                    changeSelectAllBtn: 'deselect all'
                })
            }
            if (e.target.checked == false) {
                this.setState({
                    changeSelectAllBtn: 'select all'
                })
            }
        }


        renderCheckAll() {
            if (this.state.multiChoice == true)
                return ( <
                    div className = "reset" >
                    <
                    input className = "select-all"
                    type = "checkbox"
                    onChange = {
                        this.checkAll
                    }
                    />

                    <
                    label className = "select-all-label"
                    htmlFor = "select-all" > {
                        this.state.changeSelectAllBtn
                    } < /label> <
                    /div>
                )
        }

        handleSearchChange(e) {
            this.setState({
                searchString: e.target.value
            });
        }



  render(){
     let options = this.props.options;
     var libraries = this.props.items,
        searchString = this.state.searchString.trim().toLowerCase();
     if(searchString.length > 0) {
        options = options.filter( l => {
        return l.label.toLowerCase().match( searchString );
       });
      }
    return (<div>
      <input className="search  tField"  type = "text" value = {this.state.searchString} onChange = {this.handleSearchChange} placeholder = "Search" />
        {options.map((l,index) => {
          return  <div className="row" key={index}>
             <div className="option-row">
                  <input
                    className= "check" 
                    type="checkbox"
                    id={index}
                    name={l.label}
                    value={l.value}
                    onChange={this.handleOnChange}
                  />
                  <label htmlFor={index}>{l.label}</label>
            </div>  
           </div>
        })}
       <div className="reset">  {this.renderCheckAll()} </div>
      </div>);
}
}


export default Select;
