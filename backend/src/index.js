require('dotenv').config();
require('./database/db');
const app = require('./app');

main = () => {
    app.listen(app.get('port'));
    console.log(`Server on port: ${app.get('port')}`);
};

main();