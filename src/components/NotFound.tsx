import * as React from "react";
import {Link} from "react-router";
import {Container, Segment} from "semantic-ui-react";

const NotFound: React.StatelessComponent<undefined> = () => {
    return (
        <Segment className="masthead welcome-page light-background"
                 textAlign={"center"}
                 vertical={true}>
            <Container>
                <div className="fixed-center">
                    <div className="logo-wrapper">
                        <Link to="/">
                            <img src="img/sitelogo.svg" alt="logo" />
                        </Link>
                    </div>
                    <div className="ui text">
                        <h1 className="ui header">
                            Not Found
                        </h1>
                    </div>
                </div>
            </Container>
        </Segment>
    );
};

export default NotFound;
