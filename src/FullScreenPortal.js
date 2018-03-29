//import React from 'react'
import ReactDOM from 'react-dom'

import Modal from './components/FullScreenModal'
import React, {Component} from 'react';

class FullScreenPortal extends Component {
    constructor(props) {
        super(props)

        this.rootSelector = document.getElementById('root-modal');
        this.container = document.createElement('div');
        this.componentDidMount=this.componentDidMount.bind(this);
        this.componentWillUnmount=this.componentWillUnmount.bind(this);

    }

    componentDidMount() {
        this.rootSelector.appendChild(this.container)
    }

    componentWillUnmount() {
        this.rootSelector.removeChild(this.container)
    }

    render() {
        //alert("heere");
        return ReactDOM.createPortal(<Modal {...this.props} />, this.container);
    }
}

export default FullScreenPortal
