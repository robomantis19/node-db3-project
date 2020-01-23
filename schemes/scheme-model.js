const express = require('express');

const db = require('../data/db.config.js');

module.exports = { 
    find, 
    add, 
    findById, 
    findSteps,  
    myremove, 
    myupdate, 

}

function find() { 
    return db('schemes'); 
}

function add(input) { 
    return db('schemes')
    .insert(input)
    .then((id) => { 
        return findById(id[0])
    });
}

function findById(id){
    return db('schemes')
    .where({ id })
    .first(); 
}

function findSteps(id){
    return('schemes')
    .join('steps', 'schemes.id', 'steps.scheme_id')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where('steps.scheme_id', id);
}


function myupdate(id, changes){
    return db('schemes')
    .where({id: id}).update(changes)
}

function myremove(id){
    return db('scheme')
    .where({id: id}).remove();
}