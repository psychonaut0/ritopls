export class Particle {
    particlesOptions = {
        background: {

            color: {
                value: 'transparent'
            }

        },
        fpsLimit: 144,
        interactivity: {

            detectsOn: 'canvas',
            events: {
                onClick: {
                    enable: false,
                    mode: 'push'
                },
                onHover: {
                    enable: true,
                    mode: 'bubble'
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.5,
                    size: 10,
                    speed: 3
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 150,
                    duration: 0.2
                }
            }

        },
        particles: {

            color: {
                value: '#ffffff'
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.1,
                width: 1
            },
            collisions: {
                enable: false
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 1,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800
                },
                value: 100
            },
            opacity: {
                value: 0.3
            },
            shape: {
                type: 'triangle'
            },
            size: {
                random: true,
                value: 5
            }

        },
        detectRetina: true
    };
}
