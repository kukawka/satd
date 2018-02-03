import React from "react";

export default class PageThumbnail extends React.Component {
    render() {
        return (
            <div class="thumbnail">
                <img src="../containers/checkup.jpg" alt="..." class="thumbnail-pic"/>
                <div class="caption">
                    <h5>{this.props.page.title}</h5>
                    <p><a href="#" class="btn btn-info" role="button"> <span
                        class="glyphicon glyphicon-zoom-in pull-left" aria-hidden="true"></span>View</a> <a href="#"
                                                                                                            class="btn btn-success"
                                                                                                            role="button"><span
                        class="glyphicon glyphicon-plus pull-left" aria-hidden="true"></span>Add</a></p>
                </div>
            </div>
        );
    }
}