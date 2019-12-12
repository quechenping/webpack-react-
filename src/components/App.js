import React, { useState } from 'react';
import './index.css'
import {Button} from 'antd'
import About from './about'

function App() {
    const [count, setCount] = useState(0);
    return (
        <div id="div1">
        <p>You clicked {count} times</p>
        <Button type="primary" onClick={() => setCount(count + 1)}>
          Click me
        </Button>
        <About />
      </div>
    )
}

export default App