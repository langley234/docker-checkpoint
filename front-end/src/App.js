import React from 'react';

class App extends React.Component {
    constructor(props) {
        console.log('Constructing')
        super(props);

        this.state = {
            data : null,
            dataLoaded : false,
            error : {status: false, message: 'No Error'}
        }
    }

    componentDidMount() {
        const headers = { 'Content-Type': 'application/json' };

        fetch("http://localhost:3001/names/1", {
            method: 'GET',
            mode: 'cors',
            headers
        })
            .then((result) => {
                console.log(result);
                let errorMessage = 'No Error';

                if (result.status === 200) {
                    result = result.json()
                        .then((result) => {
                            this.setState({
                                data : result[0],
                                dataLoaded : true
                            })
                        })
                } 
                else if (result.status === 404) {
                    this.setState({
                        dataLoaded : true,
                        error : {status: true, message: 'No Data found'}
                    })
                }
                else if (result.status === 400) {
                    this.setState({
                        dataLoaded : true,
                        error : {status: true, message: 'Improper Data Used for GET'}
                    })
                }
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.dataLoaded ?
                    <div>
                        {`ID : ${`${this.state.data.name_id}`} First Name : ${this.state.data.first_name} Last Name : ${this.state.data.last_name}`}
                    </div> :
                    <div>Loading...</div>
                }
            </div>
        )
    }
}

export default App;