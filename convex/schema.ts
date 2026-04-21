import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    body: v.string(),
    type: v.union(v.literal("blog"), v.literal("journal")),
    status: v.union(v.literal("draft"), v.literal("published")),
    coverImage: v.optional(v.string()), // storageId
    author: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"])
    .index("by_type_and_status", ["type", "status"]),

  projects: defineTable({
    title: v.string(),
    description: v.string(),
    tag: v.string(),
    image: v.optional(v.string()), // storageId or URL
    link: v.optional(v.string()),
    order: v.optional(v.number()),
  }),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    isRead: v.boolean(),
  }),

  newsletter: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
});
