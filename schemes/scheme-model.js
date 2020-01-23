const express = require('express');

const db = require('../data/db.config.js');

module.exports = { 
    find, 
    add, 
    findById, 
    // findSteps,  
    // remove, 
    // update, 

}

function find() { 
    return db('schemes'); 
}

function add(input) { 
    return db('schemes')
    .insert(input)
    .then(([id]) => { 
        return findById(id)
    });
}

function findById(id){
    return db('schemes')
    .where({ id })
    .first(); 
}