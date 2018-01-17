import { LayoutDiv } from "components/index";
import * as React from "react";
import "sass/vendor.scss";

class Layout extends React.Component<any, undefined> {
    constructor(props: any) {
        super(props);
    }

    render(): JSX.Element {
        const {children} = this.props;

        return (
            <LayoutDiv>
                {children}
            </LayoutDiv>
        );
    }
}




export default Layout;
