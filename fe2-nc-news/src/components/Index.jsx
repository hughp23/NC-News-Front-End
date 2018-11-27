import React from 'react';

const Index = (props) => {
    return (
        <div>
            {return props.children}
        </div>
    );
};

export default Index;

ReactDOM.render(<Index><h1>Hi</h1></Index>)