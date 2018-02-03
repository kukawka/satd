import React from "react";
export default class StoryThumbnail extends React.Component {
    render() {
        return (
            <div class="thumbnail">
                <div class="caption">
                    <h3>{this.props.story.title}</h3>
                    <p>{this.props.story.date}</p>
                    <p>{this.props.story.patient}</p>
                    <p><a href="#" class="btn btn-primary" role="button"><span
                        class="glyphicon glyphicon-edit pull-left"
                        aria-hidden="true"></span>Edit</a> <a href="#" class="btn btn-default"
                                                              role="button"><span
                        class="glyphicon glyphicon-play pull-left" aria-hidden="true"></span>Preview</a>
                    </p>
                </div>
            </div>
        );
    }
}