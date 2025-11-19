import { z } from "zod";

export const playerSchema = z.object({
    _id: z.string(),
    playerId: z.number().int(),
    name: z.string(),
    team: z.string(),
    teamId: z.number().int(),
    position: z.string(),
    nationality: z.string(),
    age: z.number().int(),
    height: z.number().int(),
    weight: z.number().int(),
    jerseyNumber: z.number().int(),
    stats: z.object({
        gamesPlayed: z.number().int(),
        pointsPerGame: z.number(),
        reboundsPerGame: z.number(),
        assistsPerGame: z.number(),
        stealsPerGame: z.number(),
        blocksPerGame: z.number(),
        fieldGoalPercentage: z.number(),
        threePointPercentage: z.number(),
        freeThrowPercentage: z.number(),
        efficiency: z.number(),
        minutesPerGame: z.number()
    })
});

export type Player = z.infer<typeof playerSchema>;