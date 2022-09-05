const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 1000,
            },
        },
        color: {
            value: "#0d47a1",
        },
        opacity: {
            value: 1,
            random: true,
            anim: {
                enable: true,
                speed: 1.2,
                opacity_min: 0,
                sync: false,
            },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#0d47a1",
            opacity: 1,
            width: 2,
        },
        move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab",
            },
            onclick: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 175,
                line_linked: {
                    opacity: 0.6,
                },
            },
            bubble: {
                distance: 250,
                size: 0,
                duration: 2,
                opacity: 0,
                speed: 3,
            },
            repulse: {
                distance: 250,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
};

export default particlesConfig;
