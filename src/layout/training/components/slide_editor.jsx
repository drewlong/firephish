import React, {Component} from 'react';
import JoditEditor from "jodit-react";

export default class SlideEditor extends Component{
  constructor(props){
    super(props)
    this.editorRef = React.createRef()
    this.state = {
      config: { readonly: false },
      content: ""
    }
  }
  componentDidMount = () => {
  }
  render(){
    return(
      <JoditEditor
        ref={(r) => this.editorRef = r}
        value={this.state.content}
        config={this.state.config}
        tabIndex={1} // tabIndex of textarea
        onBlur={() => {}} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}}
        />
    )
  }
}
