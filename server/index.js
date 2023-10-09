const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json')

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
const merkleTree = new MerkleTree(niceList);

const root = merkleTree.getRoot();

// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'root';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const {name, proof} = body;
  verifyProof(name, proof, MerkleTree);

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(name, proof, MerkleTree);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
