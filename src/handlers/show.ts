import { DateTime } from 'luxon';
import { CommandContext } from 'discord-hono';
import { embedColor } from '../utils';
import { type Env } from '../env_types';

const handleShow = async (c: CommandContext<Env>) => {
    const guild = c.interaction.guild_id;
    const savedLast = await c.env.GUILD_INCIDENTS.get(guild);
    let description = `:white_check_mark: No incidents on record.`;

    if(savedLast !== null) {
        const last = DateTime.fromMillis(parseInt(savedLast));
        const diff = last
            .diffNow(['days', 'hours', 'minutes', 'seconds'])
            .negate()
            .toObject();
        
        const format = [
            diff.days ? `${diff.days} days` : null,
            diff.hours ? `${diff.hours} hours` : null,
            diff.minutes ? `${diff.minutes} minutes` : null,
            diff.seconds  ? `${diff.seconds.toFixed()} seconds` : null,
        ].filter(u => u !== null).join(', ')


        description = `:information_source: ${format} since last incident.`
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

export default handleShow;
