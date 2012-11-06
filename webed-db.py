#!bin/python

###############################################################################
###############################################################################

from webed.extensions import db

###############################################################################
###############################################################################

def init (db):
    db.create_all ()

def drop (db):
    db.drop_all ()

###############################################################################
###############################################################################

if __name__ == '__main__':

    init (db)

###############################################################################
###############################################################################

