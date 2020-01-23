const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
  .then(schemes => {
    console.log(schemes)
    res.json(schemes);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
  .then(steps => {
    if (steps.length) {
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps' });
  });
});

router.post('/', (req, res) => {
  const schemeData = req.body;
  console.log(schemeData);
  Schemes.add(schemeData)

  .then(scheme => {
    console.log(scheme)
    res.status(201).json(scheme);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new scheme' });
  });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;


  Schemes.myupdate(id, changes)
  .then(scheme => {
    if (scheme) {
        res.status(200).json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.myremove(id)
  .then(deleted => {
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme' });
  });
});

module.exports = router;