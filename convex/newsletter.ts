import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existing) {
      return { success: true, message: "Already subscribed" };
    }

    await ctx.db.insert("newsletter", { email: args.email });
    return { success: true, message: "Subscribed successfully" };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("newsletter").order("desc").collect();
  },
});
