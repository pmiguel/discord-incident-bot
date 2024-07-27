import process from 'node:process';
import { Command, SubCommand, register } from 'discord-hono';


const token = process.env.DISCORD_TOKEN || '';
const applicationId = process.env.DISCORD_APPLICATION_ID || '1265797032107311225';
const testServer = process.env.DISCORD_TEST_SERVER || '1259266594043986030';

if (!token) {
  throw new Error('The DISCORD_TOKEN environment variable is required.');
}
if (!applicationId) {
  throw new Error(
    'The DISCORD_APPLICATION_ID environment variable is required.',
  );
}

const commands = [
    new Command('incident', 'Register, reset or view when the last incidents ocorred.')
      .type(1)
      .guild_id(testServer)
      .options(
          new SubCommand('reset', 'Resets the incident counter'),
          new SubCommand('show', 'Days since last incident')
      )
];


await register(commands, applicationId, token, testServer); 
