import { DiscordHono, CommandContext } from 'discord-hono';
import { embedColor } from './utils';

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key]
}

type Env = {
  Bindings: Bindings
}

const app = new DiscordHono<Env>();

const handleReset = async (c: CommandContext<Env>) => {
  const guild = c.interaction.guild_id;
  const now = Date.now();
  await c.env.GUILD_INCIDENTS.put(guild, now);

  console.log(c.interaction);

  const message = {
    embeds: [
      {
        title: "A new INCIDENT has occorred!",
        description: `:fire: Incident registed at ${now} by <@!${c.interaction.member.user.id}>`,
        color: embedColor('red'),
      },
    ],
  }

  return c.res(message);
};

const handleShow = async (c: CommandContext<Env>) => {
  const guild = c.interaction.guild_id;
  const last = await c.env.GUILD_INCIDENTS.get(guild);

  let description = `:white_check_mark: No incidents on record.`;

  if(last !== null) {
    description = `:information_source: ${(Date.now() - parseInt(last)) / 1000} seconds since last incident.`
  }

  const message = {
    embeds: [
      {
        title: "Incident Record",
        description,
        color: embedColor('blue'),
      },
    ],
  }

  return c.res(message);
};

const commandRouter = (c: CommandContext<Env>) => {
  switch(c.sub.string) {
    case 'reset': return handleReset(c);
    case 'show': return handleShow(c);
    default:  return c.res('ERROR');    
  }
}

app.command('incident', commandRouter);

export default app;