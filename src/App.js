import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css';

import Post from './components/Post.js'
import PostLandscape from './components/PostLandscape';

function App() {
    return (
      <Router>
        <Route exact path="/" component={Post} />
        <Route path="/landscape" component={PostLandscape} />
      </Router>
    );
}

export default connect()(App);
