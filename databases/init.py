from .db import Base, engine
from . import models

if __name__ == "__main__":
    Base.metadata.create_all(engine)
    print('Done!')
