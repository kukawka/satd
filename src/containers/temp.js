
<div className="Stories">
    <Grid>
        <div class="well">
            <Row className="show-grid">
                <Col xs={12} md={10}>
                </Col>
                <Col xs={12} md={2}>
                    <ButtonToolbar class="pull-right">
                        <Button bsStyle="success" bsSize="large" block>
                            <span class="glyphicon glyphicon-pencil pull-left" aria-hidden="true"></span>
                            New Story
                        </Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        </div>
        <div class="well" id="toolbar">
            <Row>
                <Col xs={12} md={1}>
                    Sort by
                </Col>
                <Col xs={12} md={3}>
                    <ButtonToolbar>
                        <DropdownButton
                            bsSize="large"
                            title="Date created"
                            id="dropdown-size-large"
                        >
                            <MenuItem eventKey="1">Action</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                </Col>
                <Col xs={12} md={1}>
                    Search
                </Col>
                <Col xs={12} md={7}>

                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for..." onChange={this.filterList}/>
                        <span class="input-group-btn">
                                    <button class="btn btn-default" type="button">Go!</button>
                                  </span>
                    </div>

                </Col>
            </Row>
        </div>
        <Row>
            <Col xs={12} md={1}>
            </Col>
            {this.listOfAll}
            <Col xs={12} md={2}>
            </Col>
        </Row>
    </Grid>
</div>