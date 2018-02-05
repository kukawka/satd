import React from "react";
import {
    Button
} from "react-bootstrap";
import Stories from "../containers/Stories";

export default class SearchBoxStory extends React.Component {
    render() {
        return (
            <div class="input-group">
                <input id="searchbox" type="text" class="form-control"
                       placeholder="Search for..."/>
                <span class="input-group-btn">
                                    <Button>Cancel</Button>
                                  </span>
            </div>
        );
    }
}