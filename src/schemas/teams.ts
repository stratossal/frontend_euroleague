import { z } from "zod";

export const teamSchema = z.object({
    _id: z.string(),
    teamId: z.number().int(),
    name: z.string().min(1, "Team name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    coach: z.string().min(1, "Coach is required"),
    arena: z.string().min(1, "Arena is required"),
    founded: z.number().int().min(1800, "Invalid founding year"),
    website: z.string().min(1,"Invalid website URL"),
    logo: z.string(),
    standings: z.object({
        wins: z.number().int().min(0),
        losses: z.number().int().min(0),
        position: z.number().int().min(1),
        pointsFor: z.number().int(),
        pointsAgainst: z.number().int(),
        pointDifference: z.number().int()
    }),
    teamStats: z.object({
        pointsPerGame: z.number().min(0),
        reboundsPerGame: z.number().min(0),
        assistsPerGame: z.number().min(0),
        fieldGoalPercentage: z.number().min(0).max(100),
        threePointPercentage: z.number().min(0).max(100),
        freeThrowPercentage: z.number().min(0).max(100),
        defensiveRating: z.number(),
        offensiveRating: z.number()
    })
});

export type Team = z.infer<typeof teamSchema>;