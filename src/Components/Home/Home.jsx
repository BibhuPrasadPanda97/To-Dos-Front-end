import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className='hero-section'>
        <div>
            <h1>The To-Dos App</h1>
            <div className="d-flex justify-content-end">
                <small className='app-working-instruction'>(Click on <span style={{cursor: "pointer"}} >Login</span> button to use the app)</small>
            </div>
        </div>
    </div>
  )
}
