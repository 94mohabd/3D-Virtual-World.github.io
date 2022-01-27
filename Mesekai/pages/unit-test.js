var assert = require('assert');

import React, { useEffect } from "react";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

import { Avatar } from '../scripts/avatar';
import { Grid } from '../scripts/world/grid';
import { Forest } from '../scripts/world/forest';

export default function UnitTest() {
    useEffect(async () => {
        const loader = new FBXLoader();
        
        // avatar model loading and instantiation
        let avatar = await Avatar("remy", loader);
        let test = typeof avatar == "object";
        assert(test);
        console.log("Remy Avatar: " + test);

        avatar = await Avatar("stefani", loader);
        test = typeof avatar == "object";
        assert(test);
        console.log("Stefani Avatar: " + test);

        // world preset loading and instantiation
        const worldDim = 2000

        let [world, skyColor] = Grid(worldDim, loader);
        test = typeof world == "object";
        assert(test);
        console.log("Grid World: " + test);
        test = skyColor == 10526880;
        assert(test);
        console.log("Grid World Sky: " + test);

        [world, skyColor] = Forest(worldDim, loader);
        test = typeof world == "object";
        assert(test);
        console.log("Forest World: " + test);
        test = skyColor == 8900331;
        assert(test);
        console.log("Forest World Sky: " + test);
    });

    return (
        <div>
            <h1 style={{color:"white"}}>Avatar Unit Tests</h1>
            <a href="https://github.com/CSC-648-SFSU/csc648-fa21-04-Team04/blob/master/Mesekai/pages/unit-test.js">Code</a>
            <p style={{color:"white"}}> <br/>
                tests Avatar and World loading and instantiation <br/>
                check console for following output: <br/><br/>
                Remy Avatar: true <br/>
                Stefani Avatar: true <br/>
                Grid World: true <br/>
                Grid World Sky: true <br/>
                Forest World: true <br/>
                Forest World Sky: true <br/>
            </p>
        </div>
    );
}