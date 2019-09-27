import hashlib
import requests

import sys

from uuid import uuid4

from timeit import default_timer as timer

import random


def proof_of_work(last_proof):
    """
    Multi-Ouroboros of Work Algorithm
    - Find a number p' such that the last six digits of hash(p) are equal
    to the first six digits of hash(p')
    - IE:  last_hash: ...999123456, new hash 123456888...
    - p is the previous proof, and p' is the new proof
    """
    start = timer()
    print("Searching for next proof")
    proof = random.randrange(1, 9)
    while valid_proof(last_proof, proof) is False:
        proof += random.randrange(1, 5)
    print("Proof found: " + str(proof) + " in " + str(timer() - start))
    return proof


def valid_proof(last_proof, proof):
    """
    Validates the Proof:  Multi-ouroborus:  Do the last six characters of
    the last hash match the first six characters of the proof?

    IE:  last_hash: ...999123456, new hash 123456888...

    """

    # guess = f'{last_proof}{proof}'.encode()
    # last_hash = hashlib.sha256(f'{last_proof}'.encode()).hexdigest()
    # guess_hash = hashlib.sha256(guess).hexdigest()
    # # print(last_hash[-4:], last_hash, guess_hash[:4], guess_hash)

    last_hash = hashlib.sha256(str(last_proof).encode()).hexdigest()
    guess_hash = hashlib.sha256(f'{last_proof}, {proof}').hexdigest()
    return guess_hash[:6] == "000000"


if __name__ == '__main__':
    # What node are we interacting with?
    if len(sys.argv) > 1:
        node = sys.argv[1]
    else:
        node = "https://lambda-treasure-hunt.herokuapp.com/api/bc"

    coins_mined = 0

    # Run forever until interrupted
    while True:
        # Get the last proof from the server
        r = requests.get(url=node + "/last_proof")
        data = r.json()
        new_proof = proof_of_work(data.get('proof'))

        post_data = {"proof": new_proof,
                     "id": "Token 7fc21066519eaab7fdbd65398a1cc6fea8286905"}

        r = requests.post(url=node + "/mine", json=post_data)
        data = r.json()
        if data.get('message') == 'New Block Forged':
            coins_mined += 1
            print("Total coins mined: " + str(coins_mined))
        else:
            print(data.get('message'))
