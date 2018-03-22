import React, {Component} from "react";
import Container from "../components/Container";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';

function SampleNextArrow(props) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{...style, display: 'block', background: 'red'}}
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
        return (
            <div className="container">
                <h2>Custom Arrows</h2>
                <Slider {...settings}>
                    <div className="d-flex justify-content-center">
                        <figure>
                            <img src={require('../images/checkup.jpg')} alt="The Pulpit Rock" width="304" height="228"/>
                                <figcaption>Fig1. - A view of the pulpit rock in Norway.</figcaption>
                        </figure>
                    </div>

                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                    <div><h3>5</h3></div>
                    <div><h3>6</h3></div>
                </Slider>
            </div>
    );
    }
    }