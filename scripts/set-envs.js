const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environments = {
    mapbox_key: "${process.env['MAPBOX_KEY']}",
    ms_business: "${process.env['MS_BUSINESS']}",
    ms_security: "${process.env['MS_SECURITY']}",
};
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
