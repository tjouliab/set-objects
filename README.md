# set-objects

A package to implement an equivalent to Set for objects in Typescript.

The idea behind this package is to complain about production code, which is often sloppy, by showing that it's not that complicated to do things properly. In this case, I regularly come across unoptimized ways of removing duplicates from a list of objects, and I wanted to see how far it is possible to optimize this problem.

To address it problem, I've adopted the Set syntax in Typescript, adapting the algorithm with a Mapping, to gain in performance. I coupled all this with unit tests and a benchmark to validate my program, things often neglected in production code.
