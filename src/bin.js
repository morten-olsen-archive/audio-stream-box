const commander = require('commander');
const create = require('.');

const start = commander.command('start');
start.option('-n --name <NAME>', 'Name of the instance', process.env.NAME);
start.option('-p --port <PORT>', 'Port to listen on', 5003, parseInt);
start.action(({ port, name }) => {
  create({
    name: name || 'Music Streamer',
    port,
  });
});

commander.parse(process.argv);

