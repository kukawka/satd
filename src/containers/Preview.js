import React, {Component} from "react";
import Container from "../components/Container";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';
import Glyphicon from "../components/Glyphicon";

function SampleNextArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{...style, display: 'block', background: 'green'}}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{...style, display: 'block', background: 'green'}}
            onClick={onClick}
        />
    );
}


export default class Preview extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };

        const pages = this.props.pages
            .sort((a,b) => a.id - b.id)
            .map((page) =>
                <div className="card">
                    <div className="card-header">
                        <div class="d-flex justify-content-end">
                        <button className="btn btn-danger" disabled={true}><Glyphicon glyph="hand-up"/></button>
                        </div>
                    </div>
                    <img src={require('../images/' + page.imageTitle + '.jpg')} alt="No image assigned yet."
                         className="card-img-top"/>
                    <div className="card-body">
                            <h5 className="card-title">{page.title}</h5>
                            <p className="card-text">{page.text}</p>
                    </div>
                    </div>
            );

        return (
                <Slider {...settings}>
                    {pages}
                </Slider>
    );
    }
    }
