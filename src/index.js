import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import 'fontsource-roboto';

function App() {
    return (
            <Button>
                Hello
            </Button>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));