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
        //alert(this.props.pages);
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };

        const imgStyle = {
            maxHeight: 250,
            maxWidth:330,
            height:"auto",
            width: "auto"
        };

        const pages = this.props.pages
            .sort((a,b) => a.id - b.id)
            .map((page) =>
                <div className="card">
                    <div className="card-header d-flex justify-content-center">
                    <img src={require('../images/' + page.imageTitle + '.png')} alt="No image assigned yet."
                         className="card-img-top" style={imgStyle}/>
                    </div>
                    <div class="card-body">
                        <p class="card-text">{
                            page.text.length>80 ? [page.text.substring(0,70), "..."] : page.text}</p>
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
