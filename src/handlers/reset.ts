import { DateTime } from 'luxon';
import { CommandContext } from 'discord-hono';
import { embedColor, mention } from '../utils';
import { type Env } from '../env_types';

const handleReset = async (c: CommandContext<Env>) => {
    const guild = c.interaction.guild_id;
    const now = DateTime.now();
    await c.env.GUILD_INCIDENTS.put(guild, now.toMillis());
  
    const output = {
      embeds: [
        {
          title: "A new INCIDENT has occorred!",
          description: `:fire: Incident registed at ${now.toFormat('fff')} by ${mention(c.interaction.member.user.id)}`,
          color: embedColor('red'),
        },
      ],
    }
  
    return c.res(output);
};


export default handleReset;