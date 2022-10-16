module.exports = {
    apps: [
        {
            name: 'privacy-detection-bff-inland-app',
            script: 'dist/src/main.js',
            env_staging: {
                NODE_ENV: 'staging',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
}
