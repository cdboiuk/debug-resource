import React from 'react';
import IStateAppDebug from '../interfaces/IStateAppDebug';

class App extends React.Component<{}, IStateAppDebug> {
    constructor(props: {}) {
        super(props);

        this.state = {
            open: false,
            debug: {}
        }
    }

    public componentDidMount() : void {
        window.addEventListener('message', (event) => {
            switch(event.data.action) {
                case 'open':
                    this.setState({ open: event.data.open  });
                    break;
                case 'debug':
                    delete event.data.action;
                    this.setState({ debug: event.data  });
                    break;
            }
        });
    };

    private dataRow(entry: string[]) : React.ReactElement {
        return <div className="debug__data-row">{ entry[0] }: { entry[1] }</div>;
    }

    public render() : React.ReactElement {
        return (
            <div className={ this.state.open ? 'debug debug--open' : 'debug' }>
                <div className="debug__wrapper">
                    { Object.entries(this.state.debug).map((entry) => this.dataRow(entry))}
                </div>
            </div>
        )
    }
};

export default App;