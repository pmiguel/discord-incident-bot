type EmbedColor = 'blue' | 'red';

const embedColor = (name: EmbedColor): number => {
    switch(name) {
        case 'blue': return 1667583;
        case 'red': return 16730880;
        default: return 0xFFFFFF;
    } 
}

export { embedColor }