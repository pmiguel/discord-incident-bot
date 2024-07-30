import { DiscordHono, CommandContext } from 'discord-hono';
import { type Env } from './env_types';

import handleShow from './handlers/show';
import handleReset from './handlers/reset';

const app = new DiscordHono<Env>();

const incidentSubcommandRouter = (c: CommandContext<Env>) => {
  switch(c.sub.string) {
    case 'reset': return handleReset(c);
    case 'show': return handleShow(c);
    default:  return c.res('ERROR');    
  }
}

app.command('incident', incidentSubcommandRouter);

export default app;