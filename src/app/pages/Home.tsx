import {connect} from "react-redux";
import * as React from "react";
import {Container, Segment} from "semantic-ui-react";
import { Spreadsheet } from "components/index";

interface IHomeState {
    title: string;
}


class Home extends React.Component<any, IHomeState> {

    constructor(props: any) {
        super(props);
    }

    render(): JSX.Element {

        return (
            <Segment className="masthead welcome-page light-background"
                     textAlign={"center"}
                     vertical={true}>
                <Container>
                    <div className="fixed-center">
                        <div className="ui text">
                            <h1 className="ui header">
                                Spreadsheet
                            </h1>
                        </div>
                        <div className="center aligned">
                            <Spreadsheet />
                        </div>
                    </div>
                </Container>
            </Segment>
        );
    }
}

const mapStateToProps = state => state;

export default connect()(Home);
