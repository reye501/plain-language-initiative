import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../styles/Editor.css';

// Making the content of the editor persist by storing them in local storage

export default class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        const content = window.localStorage.getItem(`content_${this.props.order}`);
        this.state = {
            editorState: ''
        };
        if (content) {
            this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
        } else {
            this.state.editorState = EditorState.createWithContent(ContentState.createFromText(this.props.q_default))
        }
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    saveContent = (content) => {
        window.localStorage.setItem(`content_${this.props.order}`, JSON.stringify(convertToRaw(content)));
    }

    onEditorStateChange(editorState) {
        console.log(this.props.order);
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
        <div>
            <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            />
            {/* <textarea
            disabled
            value={JSON.stringify(editorState, null, 4)}
            /> */}
        </div>
        );
    }
}