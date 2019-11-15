/**
 * @module WindModifiers
 *
 * @description A collection of optional functions for customizing
 * wind behavior.
 */
const WindModifiers = {
    noEffect: () => {},

    blowFromLeftDirection: (wind) => {
        // wind.force.set(2000, 0, 1000);
        // wind.force.set(2000, 0, -1000);

        // 300 * 200 * 0.1
        // wind.force.set(1000, 500, 1);
        // 300 * 100 * 0.15
        wind.force.set(1000, 700, 1);
    },

    blowFromTopDirection: (wind) => {
        // wind.force.set(2000, 0, 1000);
    },

    rotatingDirection: (wind, time) => {
        wind.force.set(
            Math.sin(time / 2000),
            Math.cos(time / 3000),
            Math.sin(time / 1000)
        );
    },

    constantSpeed: (wind) => {
        wind.force.multiplyScalar(wind.speed);
    },

    variableSpeed: (wind, time) => {
        wind.force.multiplyScalar(
            Math.cos(time / 7000) * (wind.speed / 2) + wind.speed
        );
    }
};

export default WindModifiers;
