import React from "react";
import Particles from "react-particles-js";
import ParticleConfig from "./config/particle-config";

export default function ParticleBackground() {
    return <Particles width="98vw" height="98vh" params={ParticleConfig}></Particles>;
}
