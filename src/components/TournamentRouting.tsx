import React, { Component } from 'react'
import TournamentView from './TournamentView';
import { Router } from '@reach/router';

const TournamentRouting = () => {
        return (
        <div>
            <Router>
                <TournamentView path='/tournament/:id' />
            </Router>
        </div>
        )
}

export default TournamentRouting;
